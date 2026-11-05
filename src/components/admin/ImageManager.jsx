"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Grid of photos with drag-to-reorder, a position box, remove, and optional name/details.
export default function ImageManager({
  title,
  photos = [],
  onReorder,
  onRemove,
  onDetailChange,
}) {
  const dragIndex = useRef(null);
  const [overIndex, setOverIndex] = useState(null);

  if (!photos.length) {
    return null;
  }

  const moveTo = (fromIndex, toIndex) => {
    const target = Math.min(Math.max(toIndex, 0), photos.length - 1);
    if (target !== fromIndex) {
      onReorder(fromIndex, target);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-slate-700">
          {title} · {photos.length} image{photos.length !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-slate-500">
          Drag a photo or change its position number to reorder. The website
          shows photos in this order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((photo, index) => (
          <div
            key={photo.key}
            onDragOver={(event) => {
              event.preventDefault();
              setOverIndex(index);
            }}
            onDragLeave={() => setOverIndex(null)}
            onDrop={(event) => {
              event.preventDefault();
              if (dragIndex.current !== null) {
                moveTo(dragIndex.current, index);
              }
              dragIndex.current = null;
              setOverIndex(null);
            }}
            className={`flex flex-col gap-2 rounded-xl border p-2 transition ${
              overIndex === index
                ? "border-primary bg-blue-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div
              draggable
              onDragStart={(event) => {
                dragIndex.current = index;
                event.dataTransfer.effectAllowed = "move";
              }}
              onDragEnd={() => {
                dragIndex.current = null;
                setOverIndex(null);
              }}
              className="relative aspect-[4/3] w-full cursor-grab overflow-hidden rounded-lg bg-slate-100 active:cursor-grabbing"
              title="Drag to reorder"
            >
              <Image
                src={photo.src}
                alt={photo.name || `Photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                unoptimized
                draggable={false}
                className="pointer-events-none object-cover"
              />
              {onRemove ? (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-sm text-white transition hover:bg-red-500"
                  aria-label="Remove image"
                >
                  x
                </button>
              ) : null}
            </div>

            {onReorder ? (
              <label className="flex items-center gap-2 text-xs text-slate-600">
                Position
                <PositionInput
                  key={index}
                  position={index + 1}
                  max={photos.length}
                  onCommit={(value) => moveTo(index, value - 1)}
                />
                <span>of {photos.length}</span>
              </label>
            ) : null}

            <input
              value={photo.name}
              onChange={(event) =>
                onDetailChange(photo.key, "name", event.target.value)
              }
              placeholder="Photo name (optional)"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <textarea
              value={photo.details}
              onChange={(event) =>
                onDetailChange(photo.key, "details", event.target.value)
              }
              placeholder="Photo details (optional)"
              rows={2}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Applies the typed position on Enter or blur, so typing "12" doesn't jump to 1 first.
function PositionInput({ position, max, onCommit }) {
  const [draft, setDraft] = useState(String(position));

  const commit = () => {
    const value = Number(draft);
    if (value && value !== position) {
      onCommit(value);
    } else {
      setDraft(String(position));
    }
  };

  return (
    <input
      type="number"
      min={1}
      max={max}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
      }}
      className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-sm"
    />
  );
}
