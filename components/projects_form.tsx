import { Project } from "@/app/generated/prisma";
import { useState } from "react";

interface ProjectsFormProps {
    onAddProject: (project: Project) => void;
}

export const ProjectsForm = ({ onAddProject }: ProjectsFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectUrl, setProjectUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);

    const addProject = async (e: React.FormEvent) => {
        e.preventDefault();
        let imageUrl: string | null = null;

        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            imageUrl = data.url;
        }

        const res = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, projectUrl, imageUrl }),
        });
        if (res.ok) {
            const data = await res.json();
            onAddProject(data.project);
            setTitle("");
            setDescription("");
            setProjectUrl("");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold pb-2">Ajouter un projet</h1>
            <form className="flex flex-col gap-2" onSubmit={addProject}>
                    <label htmlFor="title">Nom</label>
                    <input
                        className="border rounded"
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                        className="border rounded"
                        id="description"
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <label htmlFor="projectUrl">Lien</label>
                    <input
                        className="border rounded"
                        id="projectUrl"
                        type="text"
                        value={projectUrl}
                        onChange={e => setProjectUrl(e.target.value)}
                    />
                    <label htmlFor="projectImage">Image</label>
                    <input type="file"
                        className="border rounded w-fit hover:cursor-pointer px-4 py-2"
                        id="projectImage"
                        accept="image/webp"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:cursor-pointer w-fit">Valider</button>
            </form>
            {success && <div style={{ color: "green" }}>Projet ajouté avec succès !</div>}
        </div>
    );
}