import { useState } from "react";
import { Competence } from "@/app/generated/prisma";

interface EditCompetencesFormProps {
    competence: Competence;
    onUpdate: (competence: Competence) => void;
}

export const EditCompetencesForm = ({competence, onUpdate} : EditCompetencesFormProps) => {
    const [formData, setFormData] = useState<Partial<Competence>>({ name: competence.name, imageUrl: competence.imageUrl, url: competence.url, level: competence.level });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const saveEdit = async () => {
        let updatedFields = { ...formData };

        if (imageFile) {
            await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(competence.imageUrl),
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
                return value !== (competence as Competence)[key as keyof Competence];
            })
        );
        const res = await fetch("/api/competences", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: competence.id, ...changedFields }),
        });

        if (res.ok) {
            const updatedCompetence = await res.json();
            onUpdate(updatedCompetence);
        }
    };

    return (
        <div className="p-4 text-white flex flex-col gap-2">
                <input
                    className="w-full mb-2 p-2 rounded border"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    className="w-full mb-2 p-2 rounded border"
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <input
                    className="mb-2 p-2 rounded border hover:cursor-pointer"
                    type="file"
                    id="projectImage"
                    accept="image/icon"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <input
                    className="w-full mb-2 p-2 rounded border"
                    type="number"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
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