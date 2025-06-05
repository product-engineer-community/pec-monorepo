// use cloudflare r2 to upload the image
// import { R2Client } from "@cloudflare/workers-types";

// declare const env: {
//   R2_ACCOUNT_ID: string;
//   R2_ACCESS_KEY_ID: string;
//   R2_SECRET_ACCESS_KEY: string;
//   R2_BUCKET_NAME: string;
// };

import { getSupabaseServerClient } from "@packages/supabase";

export async function uploadImage(image: File): Promise<string> {
  const supabase = await getSupabaseServerClient();
  
  // Generate unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = image.name.split('.').pop() || 'jpg';
  const fileName = `${timestamp}-${randomString}.${fileExtension}`;
  const filePath = `images/${fileName}`;

  // Upload to Supabase storage
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, image, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Return the file path (not a signed URL)
  return data.path;
}
