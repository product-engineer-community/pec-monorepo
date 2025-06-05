import { NextRequest, NextResponse } from "next/server";

import { uploadImage } from "@/src/shared/api/upload/image";
import { getImageProxyUrl } from "@/src/shared/utils/image";

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
  
  // Upload the image and get the file path
  const filePath = await uploadImage(image);
  
  // Return the proxy URL instead of direct Supabase URL
  const proxyUrl = getImageProxyUrl(filePath);
  
  return NextResponse.json({ url: proxyUrl });
}
