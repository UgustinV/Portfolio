import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session?.user?.isAdmin) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = "unsigned";

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", preset);

    const response = await fetch(uploadUrl, {
        method: "POST",
        body,
    });

    const data = await response.json();
    if (!response.ok) {
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
    return NextResponse.json({ url: data.secure_url });
}