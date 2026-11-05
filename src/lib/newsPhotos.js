import { NEWS_PHOTOS_BUCKET } from "@/lib/config";

export function getNewsPhotoUrl(path) {
  if (!path) {
    return "/assets/images/hero-section.png";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${NEWS_PHOTOS_BUCKET}/${path}`;
}

// Keeps only non-empty name/details entries for photos that still belong to the event.
export function cleanPhotoDetails(details, photoUrls) {
  const cleaned = {};

  for (const path of photoUrls || []) {
    const name = details?.[path]?.name?.trim() || "";
    const text = details?.[path]?.details?.trim() || "";

    if (name || text) {
      cleaned[path] = { name, details: text };
    }
  }

  return cleaned;
}
