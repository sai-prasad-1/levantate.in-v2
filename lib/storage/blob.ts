import { put } from "@vercel/blob";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export function isAllowedImageType(mime: string) {
  return ALLOWED_TYPES.has(mime);
}

/** Upload an image to Vercel Blob. Needs BLOB_READ_WRITE_TOKEN, which Vercel adds when Blob storage is connected. */
export async function uploadImage(file: { buffer: Buffer; mime: string; filename: string }) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Image storage isn't connected: add Vercel Blob to the project");
  }
  if (!isAllowedImageType(file.mime)) {
    throw new Error("Only JPEG, PNG, WebP, or GIF images are allowed");
  }
  if (file.buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("Image must be 8MB or smaller");
  }

  const ext = file.filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const blob = await put(`insights/${new Date().getFullYear()}/image.${ext}`, file.buffer, {
    access: "public",
    contentType: file.mime,
    addRandomSuffix: true,
  });

  return { key: blob.pathname, url: blob.url, mime: file.mime, size: file.buffer.byteLength };
}
