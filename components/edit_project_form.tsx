import { useState } from "react";
import { Project } from "@/app/generated/prisma";

interface EditFormProps {
    project: Project;
    onUpdate: (project: Project) => void;
}

export const EditForm = ({project, onUpdate} : EditFormProps) => {
    const [formData, setFormData] = useState<Partial<Project>>({ title: project.title, description: project.description, projectUrl: project.projectUrl, tags: project.tags, imageUrl: project.imageUrl });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [newTags, setNewTags] = useState('');

    const addTag = () => {
        const tagsToAdd = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        setFormData(prev => ({
            ...prev,
            tags: [...(prev.tags || []), ...tagsToAdd]
        }));
        setNewTags('');
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
            const updatedProject = await res.json();
            onUpdate(updatedProject.project);
        }
    };

    return (
        <div className="p-4 flex flex-col gap-2">
                <input
                    className="w-full mb-2 p-2 rounded border"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                    className="w-full mb-2 p-2 rounded border"
                    value={formData.description}
                    onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                    }
                />
                <input
                    className="w-full mb-2 p-2 rounded border"
                    type="text"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                />
                <label htmlFor="edit_tags">Tags</label>
                <div>
                    {formData.tags?.map(tag => (
                        <button onClick={() => setFormData({ ...formData, tags: formData.tags?.filter(t => t !== tag) })} key={tag} className="border rounded px-2 py-1 mr-2 hover:cursor-pointer hover:bg-red-600">
                            {tag}
                        </button>
                    ))}
                </div>
                <input
                    id="edit_tags"
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
                    className="w-full border rounded"
                />
                <button className="bg-blue-600 px-4 py-2 rounded hover:cursor-pointer w-fit" type="button" onClick={addTag}>Ajouter un tag</button>
                <input
                    className="mb-2 p-2 rounded border hover:cursor-pointer"
                    type="file"
                    id="projectImage"
                    accept="image/webp"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <div className="flex gap-2">
                    <button
                    className="bg-green-600 px-4 py-2 rounded hover:cursor-pointer"
                    onClick={saveEdit}
                    >
                    Sauvegarder
                    </button>
                </div>
            </div>
    )
}