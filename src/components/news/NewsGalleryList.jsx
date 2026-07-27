"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BentoGallery from "@/components/BentoGallery";
import { getNewsPhotoUrl } from "@/lib/newsPhotos";

const NewsDetailModal = dynamic(
  () => import("@/components/news/NewsDetailModal"),
  { ssr: false }
);

// Widest layout is xl:grid-cols-3, so a "row" is approximated as 3 cards.
const ROWS_PER_PAGE = 2;
const ITEMS_PER_PAGE = ROWS_PER_PAGE * 3;

export default function NewsGalleryList({ items }) {
  const [activeItem, setActiveItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) =>
            Math.min(count + ITEMS_PER_PAGE, items.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length]);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-3">
      {visibleItems.map((item) => {
        const images = item.photo_urls?.length
          ? item.photo_urls.map((photo) => getNewsPhotoUrl(photo))
          : [getNewsPhotoUrl(null)];

        const openDetail = (index = 0) => {
          setActiveItem(item);
          setActiveIndex(index);
        };

        return (
          <article
            key={item.id}
            className="news-card news-card-clickable overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
            onClick={() => openDetail(0)}
          >
            <BentoGallery photos={images} onPhotoClick={openDetail} />

            <div className="news-card-body p-6">
              <h2 className="mb-2 text-xl font-semibold text-blue-800">
                {item.title}
              </h2>
              <p className="mb-3 text-sm text-gray-500">
                {item.event_date
                  ? new Date(item.event_date).toLocaleDateString()
                  : ""}
              </p>
              <p className="news-card-preview text-sm text-gray-700">
                {item.content}
              </p>
            </div>
          </article>
        );
      })}

      {visibleCount < items.length ? (
        <div ref={sentinelRef} className="h-1 md:col-span-2 xl:col-span-3" />
      ) : null}

      {activeItem ? (
        <NewsDetailModal
          item={activeItem}
          photos={
            activeItem.photo_urls?.length
              ? activeItem.photo_urls.map((photo) => getNewsPhotoUrl(photo))
              : [getNewsPhotoUrl(null)]
          }
          initialIndex={activeIndex}
          onClose={() => setActiveItem(null)}
        />
      ) : null}
    </div>
  );
}
