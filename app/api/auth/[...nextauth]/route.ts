import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@/app/generated/prisma";
import { GithubProfile } from "next-auth/providers/github";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        authorization: { params: { scope: "read:user user:email" } },
        profile(profile: GithubProfile) {
            return {
            id: profile.id.toString(),
            email: profile.email,
            image: profile.avatar_url,
            name: profile.name || profile.login,
            isAdmin: false,
            };
      },
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            if(!profile?.email){
                console.log("No email found in GitHub profile:", profile);
                return false;
            }
            const existingUser = await prisma.user.findUnique({
                where: { email: profile.email! },
            });
            if (!existingUser) {
                await prisma.user.create({
                data: { email: profile.email! },
                });
            }
            if(existingUser){
                await prisma.user.update({
                    where: { email: profile.email! },
                    data: { lastActive: new Date() },
                });
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user?.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: user.email },
                });
                
                if (dbUser) {
                    token.isAdmin = dbUser.isAdmin;
                }
            } 
            else if (token?.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email as string },
                });
                
                if (dbUser) {
                    token.isAdmin = dbUser.isAdmin;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                if (session.user) {
                    session.user.isAdmin = token.isAdmin as boolean;
                }
            }
            else if (session.user?.email) {
                const user = await prisma.user.findUnique({
                    where: { email: session.user.email },
                });
                
                if (user) {
                    session.user.isAdmin = user.isAdmin;
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/api/auth/signin',
        signOut: '/api/auth/signout',
        error: '/api/auth/error',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };