import { NextRequest, NextResponse } from "next/server";
import { CloudinaryController } from "@/services/cloudinary/controller";

export async function POST(request: NextRequest) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: "Missing image" }, { status: 400 });
  }

  try {
    const url = await CloudinaryController.uploadImage(image, "avatars");
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
