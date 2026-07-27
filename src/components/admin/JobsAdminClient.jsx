"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Pencil,
  Power,
  Search,
  Trash2,
} from "lucide-react";
import ModalAlert from "@/components/common/ModalAlert";
import { DEFAULT_JOB_LOCATION, DEFAULT_JOB_TYPE } from "@/lib/config";

const PAGE_SIZE = 6;
const emptyForm = {
  title: "",
  department: "",
  location: DEFAULT_JOB_LOCATION,
  type: DEFAULT_JOB_TYPE,
  description: "",
  requirements: "",
  is_active: true,
};

function RowActionsMenu({ job, onEdit, onToggleActive, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Row actions"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <MoreVertical size={16} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-10 mt-1 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit(job);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onToggleActive(job);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
          >
            <Power size={14} />
            {job.is_active ? "Close" : "Activate"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete(job.id);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default function JobsAdminClient({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState({
    open: false,
    title: "",
    message: "",
    variant: "success",
    confirmLabel: "OK",
    onConfirm: null,
  });

  const departments = [...new Set(jobs.map((job) => job.department).filter(Boolean))];

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [job.title, job.department, job.location, job.type]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesDepartment =
        departmentFilter === "all" || job.department === departmentFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? job.is_active : !job.is_active);

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [departmentFilter, jobs, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const showSuccessModal = (title, message) => {
    setModalState({
      open: true,
      title,
      message,
      variant: "success",
      confirmLabel: "Close",
      onConfirm: null,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/jobs/${editingId}` : "/api/jobs";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setError(data.error || "Unable to save job.");
      return;
    }

    if (editingId) {
      setJobs((current) =>
        current.map((job) => (job.id === data.id ? data : job))
      );
      showSuccessModal("Job updated", "The job details were saved successfully.");
    } else {
      setJobs((current) => [data, ...current]);
      showSuccessModal("Job created", "The new job is now available in the admin list.");
    }

    resetForm();
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setFormData({
      title: job.title || "",
      department: job.department || "",
      location: job.location || DEFAULT_JOB_LOCATION,
      type: job.type || DEFAULT_JOB_TYPE,
      description: job.description || "",
      requirements: job.requirements || "",
      is_active: job.is_active ?? true,
    });
  };

  const toggleActive = async (job) => {
    const response = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !job.is_active }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to update job.");
      return;
    }

    setJobs((current) => current.map((item) => (item.id === data.id ? data : item)));
    showSuccessModal(
      data.is_active ? "Job activated" : "Job closed",
      `The job "${data.title}" was ${data.is_active ? "re-opened" : "marked inactive"}.`
    );
  };

  const confirmDelete = (id) => {
    setModalState({
      open: true,
      title: "Delete job?",
      message: "This action will permanently remove the job from the admin list.",
      variant: "danger",
      confirmLabel: "Delete",
      onConfirm: async () => {
        const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Unable to delete job.");
          setModalState({
            open: false,
            title: "",
            message: "",
            variant: "success",
            confirmLabel: "OK",
            onConfirm: null,
          });
          return;
        }

        setJobs((current) => current.filter((job) => job.id !== id));
        setModalState({
          open: true,
          title: "Job deleted",
          message: "The job was removed successfully.",
          variant: "success",
          confirmLabel: "Close",
          onConfirm: null,
        });
      },
    });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Jobs Manager
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {editingId ? "Edit job" : "New job"}
            </h2>
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

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job title"
            className="rounded-xl border border-slate-200 px-4 py-3"
            required
          />
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            className="rounded-xl border border-slate-200 px-4 py-3"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="min-h-32 rounded-xl border border-slate-200 px-4 py-3 md:col-span-2"
          />
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Requirements"
            className="min-h-32 rounded-xl border border-slate-200 px-4 py-3 md:col-span-2"
          />

          {error ? (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 md:col-span-2">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : editingId ? "Update job" : "Create job"}
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Briefcase className="h-4.5 w-4.5" size={18} />
            </span>
            <h2 className="text-xl font-semibold text-slate-900">All jobs</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
          </span>
        </div>

        <div className="grid gap-3 border-b border-slate-100 bg-slate-50/60 px-6 py-4 md:grid-cols-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search jobs"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(event) => {
              setDepartmentFilter(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All departments</option>
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Created</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {paginatedJobs.map((job) => (
                <tr key={job.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {job.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {job.department || "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {job.type || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        job.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {job.is_active ? "Active" : "Closed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {job.created_at
                      ? new Date(job.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <RowActionsMenu
                      job={job}
                      onEdit={startEdit}
                      onToggleActive={toggleActive}
                      onDelete={confirmDelete}
                    />
                  </td>
                </tr>
              ))}
              {paginatedJobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-sm text-slate-500"
                  >
                    No jobs found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/60 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, filteredJobs.length)} of{" "}
              {filteredJobs.length} jobs
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              <span className="text-sm font-medium text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <ModalAlert
        open={modalState.open}
        title={modalState.title}
        message={modalState.message}
        variant={modalState.variant}
        confirmLabel={modalState.confirmLabel}
        onConfirm={modalState.onConfirm}
        onClose={() =>
          setModalState({
            open: false,
            title: "",
            message: "",
            variant: "success",
            confirmLabel: "OK",
            onConfirm: null,
          })
        }
      />
    </div>
  );
}
