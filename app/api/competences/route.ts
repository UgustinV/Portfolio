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
    const { name, imageUrl, url, level } = await request.json();

    try {
        const competence = await prisma.competence.create({
            data: { name, imageUrl, url, level },
        });
        return NextResponse.json({ success: true, competence }, { status: 201 });
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
        const competence = await prisma.competence.delete({
            where : { id: id },
        });
        return NextResponse.json({ success: true, competence });
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
        const competence = await prisma.competence.update({
            where: { id },
            data,
        });
        return NextResponse.json({ success: true, competence }, { status: 201 });
    } catch (error : any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}