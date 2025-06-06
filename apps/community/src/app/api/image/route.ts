import { NextRequest, NextResponse } from "next/server";

import { getImageR2Response, uploadImage } from "@/shared/api/upload/image";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return new Response("Missing key", { status: 400 });

  try {
    const r2Response = await getImageR2Response(key);
    return new Response(r2Response.Body as ReadableStream, {
      status: 200,
      headers: {
        "Content-Type": r2Response.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=2592000", // optional
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Image not found", { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image") as File;
  const url = await uploadImage(image);
  return NextResponse.json({ url });
}
