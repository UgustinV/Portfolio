import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@/app/generated/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { title, description, projectUrl, tags, imageUrl } = await request.json();

    try {
        const project = await prisma.project.create({
            data: { title, description, projectUrl, tags, imageUrl },
        });
        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error : any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
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

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id, ...data } = await request.json();
    try {
        const project = await prisma.project.update({
            where: { id },
            data,
        });
        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error : any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}