import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session.user.email;
    if (!email) {
        return Response.json({ error: "Email not found" }, { status: 400 });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { email },
        });
        return NextResponse.json({ success: true, user: deletedUser }, { status: 200 });
    } catch (error : any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}