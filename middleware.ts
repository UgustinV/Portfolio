import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
    apiAuthPrefix,
    apiPrefix,
    publicRoutes
} from "@/routes";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isAuthRoute = path.startsWith(apiAuthPrefix);
    const isApiRoute = path.startsWith(apiPrefix);
    if (isPublicRoute) {
        return NextResponse.next();
    }
    if (isApiRoute && !isPublicRoute && !isAuthRoute) {
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