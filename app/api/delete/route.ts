import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    const url = await req.json();
    if(!url) {
        return NextResponse.json({ error: "No file to delete" }, { status: 400 });
    }

    const public_id = url.split("/").pop()?.split(".")[0];

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
    .digest("hex");
    const body = new URLSearchParams();
    body.append("public_id", public_id);
    body.append("timestamp", timestamp.toString());
    body.append("api_key", process.env.CLOUDINARY_API_KEY!);
    body.append("signature", signature);
    const response = await fetch(deleteUrl, {
        method: "POST",
        body
    });

    const res = await response.json();
    if (!response.ok) {
        return NextResponse.json({ error: response }, { status: 500 });
    }
    if(res.result !== "ok") {
        return NextResponse.json({ error: "Failed to delete image from Cloudinary", details: res }, { status: 500 });
    }
    return NextResponse.json({ message: "Image deleted", status: res.status });
}