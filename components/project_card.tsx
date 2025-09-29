"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    link: string;
    imageLink: string;
    onDelete: (id: string) => void;
}

export const ProjectCard = ({id, title, description, link, imageLink, onDelete} : ProjectCardProps) => {
    const { data: session } = useSession();
    const deleteProject = async (id: string) => {
        const res = await fetch("/api/projects", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            const deletedImage = await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(imageLink),
            });
            if(deletedImage.ok) {
                onDelete(id);
            }
        }
    };

    const editProject = async (id: string) => {
        const res = await fetch("/api/projects", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            const deletedImage = await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(imageLink),
            });
            if(deletedImage.ok) {
                onDelete(id);
            }
        }
    };
    return(
        <motion.div
            className="w-[96vw] m-[2vw] rounded-lg shadow-md hover:shadow-lg bg-[#2a3760]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <a className="h-full w-full block text-white hover:text-blue-500 p-[2vh]" href={link} target="_blank" rel="noopener noreferrer">
                <div className="h-[28vh] rounded-lg mb-[1vh] overflow-hidden">
                    <img className="w-full" src={imageLink} alt="Image du projet" />
                </div>
                <h2 className="text-2xl h-[5vh]">{title}</h2>
                <p className="text-sm h-[10vh]">{description}</p>
            </a>
            {session?.user?.isAdmin ? (
                <div>
                    <button onClick={() => deleteProject(id)}>Supprimer</button>
                    <button onClick={() => editProject(id)}>Modifier</button>
                </div>
            ) : null}
        </motion.div>
    )
}