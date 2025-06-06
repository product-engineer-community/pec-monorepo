import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
} = process.env as Record<string, string>;

const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

export async function getImageR2Response(key: string) {
  const client = new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  const r2Response = await client.send(
    new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    }),
  );

  return r2Response;
}

/**
 * Upload an image file to Cloudflare R2 and return the public URL.
 * Environment variables are expected to be provided via `.env`.
 */
export async function uploadImage(image: File) {
  const buffer = Buffer.from(await image.arrayBuffer());
  const fileName = `post/${randomUUID()}-${image.name.replace(/\s+/g, "_")}`;

  const client = new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: image.type,
    }),
  );

  return `/community/api/image?key=${fileName}`;
}
