import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path.startsWith("/api/auth/") || path.startsWith("/api/contact/") || path.startsWith("/api/cleanup-users") || !path.startsWith("/api/")) {
        return NextResponse.next();
    }
    if (path.startsWith("/api/")) {
        const token = await getToken({ 
            req: request, 
            secret: process.env.NEXTAUTH_SECRET 
        });

        if (token && token.isAdmin) {
            return NextResponse.next();
        }

        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/:path*",
        "/((?!_next/static|_next/image|favicon.ico).*)"
    ],
};