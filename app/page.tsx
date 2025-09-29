import { PrismaClient } from "@/app/generated/prisma";
import HomeClient from "@/components/home_client";

const prisma = new PrismaClient();

export default async function Home() {
    const projects = await prisma.project.findMany();
    return <HomeClient projects={projects} />;
}