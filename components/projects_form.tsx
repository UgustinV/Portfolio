import { Project } from "@/app/generated/prisma";
import { useState } from "react";

interface ProjectsFormProps {
    onAddProject: (project: Project) => void;
}

export const ProjectsForm = ({ onAddProject }: ProjectsFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectUrl, setProjectUrl] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [newTags, setNewTags] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);

    const addTag = () => {
        const trimmedTags = newTags.split(',').map(t => t.trim()).filter(t => !tags.includes(t));
        if (trimmedTags && trimmedTags[0] !== "") {
            setTags(prev => [...prev, ...trimmedTags]);
            setNewTags("");
        }
    };

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
            body: JSON.stringify({ title, description, projectUrl, tags, imageUrl }),
        });
        if (res.ok) {
            const data = await res.json();
            onAddProject(data.project);
            setTitle("");
            setDescription("");
            setProjectUrl("");
            setTags([]);
            setNewTags("");
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
                    <label htmlFor="tags">Tags</label>
                    <div>
                        {tags.map(tag => (
                            <button onClick={() => setTags(tags.filter(t => t !== tag))} key={tag} className="border rounded px-2 py-1 mr-2 hover:cursor-pointer hover:bg-red-600">
                                {tag}
                            </button>
                        ))}
                    </div>
                    <input
                        id="tags"
                        type="text"
                        value={newTags}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                        onChange={e => setNewTags(e.target.value)}
                        placeholder="Ajoutez un tag (ou plusieurs, séparés par des virgules)"
                        className="border rounded"
                    />
                    <button type="button" onClick={addTag}>Ajouter un tag</button>
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