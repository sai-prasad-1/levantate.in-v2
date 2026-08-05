import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { media } from "@/lib/db/schema";
import { MAX_UPLOAD_BYTES, uploadImageToR2 } from "@/lib/storage/r2";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "Image must be 8MB or smaller" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadImageToR2({
      buffer,
      mime: file.type,
      filename: file.name,
    });

    const db = getDb();
    const [row] = await db
      .insert(media)
      .values({
        key: uploaded.key,
        url: uploaded.url,
        mime: uploaded.mime,
        size: uploaded.size,
        createdBy: session.user.id,
      })
      .returning();

    return NextResponse.json({
      id: row.id,
      url: row.url,
      key: row.key,
      mime: row.mime,
      size: row.size,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
