import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@/app/generated/prisma";
import { GithubProfile } from "next-auth/providers/github";

const prisma = new PrismaClient();

const handler = NextAuth({
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
        async session({ session }) {
            if (session.user?.email) {
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
});

export { handler as GET, handler as POST };