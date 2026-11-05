import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getPublishedNews } from "@/lib/queries/news";
import { cleanPhotoDetails } from "@/lib/newsPhotos";

export async function GET() {
  try {
    const data = await getPublishedNews();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = body.title?.trim();

  if (!title) {
    return Response.json({ error: "Event name is required." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("news_events")
    .insert({
      ...body,
      title,
      event_date: body.event_date || null,
      content: body.content?.trim() || null,
      photo_details: cleanPhotoDetails(body.photo_details, body.photo_urls),
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 201 });
}
