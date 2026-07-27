import { supabaseAdmin } from "@/lib/supabase/server";

export async function getPublishedNews() {
  const { data, error } = await supabaseAdmin
    .from("news_events")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
