"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Project } from "@/app/generated/prisma";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    projectUrl: string;
    imageUrl: string;
    createdAt: Date;
}

export const ProjectCard = ({ id, title, description, projectUrl, imageUrl, createdAt }: ProjectCardProps) => {
    return (
        <motion.div
            className="flex flex-col w-[96vw] ml-[2vw] mr-[2vw] rounded-lg shadow-md hover:shadow-lg bg-[#2a3760] lg:w-[76vw] lg:ml-[12vw] lg:mr-[12vw]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="p-[2vh] h-[50vh]">
                <a
                    className="h-full w-full block text-white hover:text-[#355492]"
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="h-[28vh] mb-[1vh] overflow-scroll lg:h-[50vh]">
                        <img className="w-full" src={imageUrl} alt="Image du projet" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-2xl py-4 lg:text-5xl">{title}</h2>
                        <p className="text-sm lg:text-2xl h-[6vh] overflow-hidden text-ellipsis">{description}</p>
                    </div>
                </a>
            </div>
        </motion.div>
    );
};