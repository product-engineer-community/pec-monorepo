import { NextRequest, NextResponse } from "next/server";

import { uploadImage } from "@/src/shared/api/upload/image";

// send the file to your server and return
// // the URL of the uploaded image in the response
// const response = await fetch("/api/upload/image", {
//     method: "POST",
//     body: formData,
//   });
//   const json = (await response.json()) as { url: string };
//   return json.url;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image") as File;
  const url = await uploadImage(image);
  return NextResponse.json({ url });
}
