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
    onDelete: (id: string) => void;
    onUpdate?: (id: string, updatedProject: Partial<ProjectCardProps>) => void;
}

export const ProjectCard = ({ id, title, description, projectUrl, imageUrl, onDelete, onUpdate }: ProjectCardProps) => {
    const { data: session } = useSession();
    const project: Project = { id, title, description, projectUrl, imageUrl };

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({ title: project.title, description: project.description, projectUrl: project.projectUrl, imageUrl: project.imageUrl });
    const [imageFile, setImageFile] = useState<File | null>(null);
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
                body: JSON.stringify(imageUrl),
            });
            if (deletedImage.ok) {
                onDelete(id);
            }
        }
    };

    const saveEdit = async () => {
        let updatedFields = { ...formData };

        if (imageFile) {
            await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project.imageUrl),
            });

            const uploadData = new FormData();
            uploadData.append("file", imageFile);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const uploadJson = await uploadRes.json();
            const newUrl: string = uploadJson.url;

            setFormData(prev => ({ ...prev, imageUrl: newUrl }));
            updatedFields.imageUrl = newUrl;
        }

        const changedFields = Object.fromEntries(
            Object.entries(updatedFields).filter(([key, value]) => {
                return value !== (project as Project)[key as keyof Project];
            })
        );

        const res = await fetch("/api/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: project.id, ...changedFields }),
        });

        if (res.ok) {
            onUpdate?.(project.id, updatedFields);
            setIsEditing(false);
        }
        };

    return (
        <motion.div
            className="w-[96vw] ml-[2vw] mr-[2vw] rounded-lg shadow-md hover:shadow-lg bg-[#2a3760] lg:w-[76vw] lg:ml-[12vw] lg:mr-[12vw]"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
        {isEditing ? (
            <div className="p-4 text-white">
                <input
                    className="w-full mb-2 p-2 rounded text-black"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                    className="w-full mb-2 p-2 rounded text-black"
                    value={formData.description}
                    onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                    }
                />
                <input
                    className="w-full mb-2 p-2 rounded text-black"
                    type="text"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                />
                <input type="file"
                        id="projectImage"
                        accept="image/webp"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <div className="flex gap-2">
                    <button
                    className="bg-green-600 px-4 py-2 rounded"
                    onClick={saveEdit}
                    >
                    Save
                    </button>
                    <button
                    className="bg-gray-600 px-4 py-2 rounded"
                    onClick={() => setIsEditing(false)}
                    >
                    Cancel
                    </button>
                </div>
            </div>
        ) : (
            <>
            <a
                className="h-full w-full block text-white hover:text-[#355492] p-[2vh]"
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="h-[28vh] rounded-lg mb-[1vh] overflow-scroll lg:h-[50vh]">
                    <img className="w-full" src={imageUrl} alt="Image du projet" />
                </div>
                <h2 className="text-2xl h-[5vh] lg:text-5xl lg:h-[8vh]">{title}</h2>
                <p className="text-sm h-[8vh] lg:text-2xl lg:h-[12vh]">
                {description}
                </p>
            </a>
            {session?.user?.isAdmin ? (
                <div className="flex gap-2 p-2">
                <button
                    className="bg-red-600 px-4 py-2 rounded"
                    onClick={() => deleteProject(id)}
                >
                    Supprimer
                </button>
                <button
                    className="bg-yellow-600 px-4 py-2 rounded"
                    onClick={() => setIsEditing(true)}
                >
                    Modifier
                </button>
                </div>
            ) : null}
            </>
        )}
        </motion.div>
    );
};