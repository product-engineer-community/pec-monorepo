// use cloudflare r2 to upload the image
import { R2Client } from "@cloudflare/workers-types";

declare const env: {
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
};

export async function uploadImage(image: File) {
  const r2 = new R2Client({
    accountId: env.R2_ACCOUNT_ID,
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    bucketName: env.R2_BUCKET_NAME,
  });

  const url = await r2.upload(image);
  return url;
}
