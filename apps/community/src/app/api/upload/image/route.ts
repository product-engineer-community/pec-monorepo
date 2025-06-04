import { NextRequest, NextResponse } from "next/server";

import { uploadImage } from "@/shared/api/upload/image";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image") as File;
  const url = await uploadImage(image);
  return NextResponse.json({ url });
}
