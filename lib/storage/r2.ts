import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("R2 credentials are not configured");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export function isAllowedImageType(mime: string) {
  return ALLOWED_TYPES.has(mime);
}

export async function uploadImageToR2(file: {
  buffer: Buffer;
  mime: string;
  filename: string;
}) {
  if (!isAllowedImageType(file.mime)) {
    throw new Error("Only JPEG, PNG, WebP, or GIF images are allowed");
  }
  if (file.buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("Image must be 8MB or smaller");
  }

  const bucket = process.env.R2_BUCKET;
  const publicBase = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!bucket || !publicBase) {
    throw new Error("R2_BUCKET and R2_PUBLIC_BASE_URL are required");
  }

  const ext = file.filename.split(".").pop()?.toLowerCase() || "bin";
  const key = `insights/${new Date().getFullYear()}/${nanoid(12)}.${ext}`;

  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mime,
    }),
  );

  return {
    key,
    url: `${publicBase}/${key}`,
    mime: file.mime,
    size: file.buffer.byteLength,
  };
}
