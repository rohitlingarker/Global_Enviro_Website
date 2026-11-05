"use client";

import { useEffect, useMemo, useState } from "react";
import ImageManager from "@/components/admin/ImageManager";
import { NEWS_PHOTOS_BUCKET } from "@/lib/config";
import { getNewsPhotoUrl } from "@/lib/newsPhotos";
import { supabase } from "@/lib/supabase/client";

// One ordered list holds saved and about-to-be-uploaded photos together, so an
// editor can place a new photo between two existing ones. Keys are prefixed so
// a saved path and a local file can never collide.
const savedKey = (path) => `e:${path}`;
const fileKey = (file) => `n:${file.name}:${file.size}:${file.lastModified}`;

const emptyForm = {
  title: "",
  event_date: "",
  content: "",
  is_published: true,
};

export default function NewsAdminClient({ initialNews }) {
  const [items, setItems] = useState(initialNews);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photoOrder, setPhotoOrder] = useState([]);
  const [photoDetails, setPhotoDetails] = useState({});
  // Name/details for not-yet-uploaded files, keyed by fileKey.
  const [newFileDetails, setNewFileDetails] = useState({});
  const [fileInputKey, setFileInputKey] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPreviews = useMemo(
    () => selectedFiles.map((file) => URL.createObjectURL(file)),
    [selectedFiles]
  );

  useEffect(
    () => () => selectedPreviews.forEach((url) => URL.revokeObjectURL(url)),
    [selectedPreviews]
  );

  const orderedItems = photoOrder.flatMap((key) => {
    if (key.startsWith("e:")) {
      const path = key.slice(2);
      return [
        {
          key,
          src: getNewsPhotoUrl(path),
          name: photoDetails[path]?.name || "",
          details: photoDetails[path]?.details || "",
        },
      ];
    }
    const index = selectedFiles.findIndex((file) => fileKey(file) === key);
    return index === -1
      ? []
      : [
          {
            key,
            src: selectedPreviews[index],
            name: newFileDetails[key]?.name || "",
            details: newFileDetails[key]?.details || "",
          },
        ];
  });

  const reorderPhoto = (fromIndex, toIndex) => {
    setPhotoOrder((current) => {
      const updated = [...current];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  // A photo removed from the list is a photo the editor no longer wants, so a
  // new file that is no longer ordered must not be uploaded either.
  const removePhoto = (index) => {
    const removedKey = photoOrder[index];
    setPhotoOrder((current) => current.filter((key) => key !== removedKey));
    if (!removedKey.startsWith("e:")) {
      setSelectedFiles((current) =>
        current.filter((file) => fileKey(file) !== removedKey)
      );
    }
  };

  const updatePhotoDetail = (key, field, value) => {
    if (key.startsWith("e:")) {
      const path = key.slice(2);
      setPhotoDetails((current) => ({
        ...current,
        [path]: { ...current[path], [field]: value },
      }));
      return;
    }
    setNewFileDetails((current) => ({
      ...current,
      [key]: { ...current[key], [field]: value },
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setSelectedFiles([]);
    setPhotoOrder([]);
    setPhotoDetails({});
    setNewFileDetails({});
    setFileInputKey((key) => key + 1);
    setEditingId(null);
    setError("");
  };

  const uploadSelectedFiles = async (files) => {
    const uploadedPaths = [];

    for (const file of files) {
      const uploadResponse = await fetch("/api/upload/news-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name }),
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Unable to prepare photo upload.");
      }

      if (uploadData.token) {
        const { error: uploadError } = await supabase.storage
          .from(NEWS_PHOTOS_BUCKET)
          .uploadToSignedUrl(uploadData.path, uploadData.token, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }
      } else {
        const directUpload = await fetch(uploadData.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });

        if (!directUpload.ok) {
          throw new Error("Unable to upload selected photo.");
        }
      }

      uploadedPaths.push(uploadData.path);
    }

    return uploadedPaths;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    let newlyUploadedUrls = [];

    try {
      newlyUploadedUrls = await uploadSelectedFiles(selectedFiles);
    } catch (uploadError) {
      setIsSubmitting(false);
      setError(uploadError.message);
      return;
    }

    const uploadedByKey = new Map(
      selectedFiles.map((file, index) => [fileKey(file), newlyUploadedUrls[index]])
    );
    const finalPhotoUrls = photoOrder.flatMap((key) => {
      if (key.startsWith("e:")) {
        return [key.slice(2)];
      }
      return uploadedByKey.has(key) ? [uploadedByKey.get(key)] : [];
    });

    const finalPhotoDetails = { ...photoDetails };
    selectedFiles.forEach((file, index) => {
      finalPhotoDetails[newlyUploadedUrls[index]] = newFileDetails[fileKey(file)];
    });

    const payload = {
      ...formData,
      photo_urls: finalPhotoUrls,
      photo_details: finalPhotoDetails,
      is_published: formData.is_published,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/news/${editingId}` : "/api/news";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.error || "Unable to save event.");
      return;
    }

    if (editingId) {
      setItems((current) => current.map((item) => (item.id === data.id ? data : item)));
    } else {
      setItems((current) => [data, ...current]);
    }

    resetForm();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || "",
      event_date: item.event_date || "",
      content: item.content || "",
      is_published: item.is_published ?? true,
    });
    setSelectedFiles([]);
    setNewFileDetails({});
    setFileInputKey((key) => key + 1);
    setPhotoOrder((item.photo_urls || []).map(savedKey));
    setPhotoDetails(item.photo_details || {});
  };

  const deleteItem = async (id) => {
    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/news/${id}`, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to delete event.");
      return;
    }

    setItems((current) => current.filter((item) => item.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              News Manager
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {editingId ? "Edit event" : "New event"}
            </h1>
          </div>

          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel edit
            </button>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={(event) =>
              setFormData((current) => ({ ...current, title: event.target.value }))
            }
            placeholder="Event name"
            className="rounded-xl border border-slate-200 px-4 py-3"
            required
          />
          <input
            type="date"
            name="event_date"
            value={formData.event_date}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                event_date: event.target.value,
              }))
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                content: event.target.value,
              }))
            }
            placeholder="Event details (optional)"
            className="min-h-40 rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            key={fileInputKey}
            type="file"
            multiple
            accept="image/*"
            onChange={(event) => {
              const files = Array.from(event.target.files || []);
              setSelectedFiles(files);
              setNewFileDetails({});
              // Saved photos keep their place; the new batch is appended and
              // can then be moved anywhere among them.
              setPhotoOrder((current) => [
                ...current.filter((key) => key.startsWith("e:")),
                ...files.map(fileKey),
              ]);
            }}
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <ImageManager
            title="Photos"
            photos={orderedItems}
            onReorder={reorderPhoto}
            onRemove={removePhoto}
            onDetailChange={updatePhotoDetail}
          />
          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  is_published: event.target.checked,
                }))
              }
            />
            Publish immediately
          </label>

          {error ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : editingId ? "Update event" : "Create event"}
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Photos</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {item.title || (
                      <span className="italic text-slate-400">Untitled</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {item.event_date
                      ? new Date(item.event_date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {item.is_published ? "Published" : "Draft"}
                  </td>
                  <td className="px-6 py-4">
                    {item.photo_urls?.length || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="rounded-lg border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-6 text-center text-sm text-slate-500"
                  >
                    No events found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
