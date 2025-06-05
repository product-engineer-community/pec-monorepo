import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

/**
 * Upload an image file to Cloudflare R2 and return the public URL.
 * Environment variables are expected to be provided via `.env`.
 */
export async function uploadImage(image: File) {
  const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
  } = process.env as Record<string, string>;

  const endpoint = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

  const client = new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  const buffer = Buffer.from(await image.arrayBuffer());
  // images saved route: camp/fileName
  const fileName = `camp/${randomUUID()}-${image.name.replace(/\s+/g, "_")}`;

  await client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: image.type,
    }),
  );

  const signedUrl = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
    }),
    { expiresIn: 10 },
  );

  return signedUrl;
}
