import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { title, description, projectUrl, imageUrl } = await request.json();

    try {
        const project = await prisma.project.create({
            data: { title, description, projectUrl, imageUrl },
        });
        return NextResponse.json({ success: true, project });
    } catch (error : any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();

    try {
        const project = await prisma.project.delete({
            where : { id: id },
        });
        return NextResponse.json({ success: true, project });
    } catch (error : any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}