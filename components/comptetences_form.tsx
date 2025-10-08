import { Competence } from "@/app/generated/prisma";
import { useState } from "react";

interface CompetencesFormProps {
    onAddCompetence: (competence: Competence) => void;
}

export const CompetencesForm = ({ onAddCompetence }: CompetencesFormProps) => {
    const [name, setName] = useState("");
    const [competenceUrl, setCompetenceUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [level, setLevel] = useState(0);
    const [success, setSuccess] = useState(false);

    const addCompetence = async (e: React.FormEvent) => {
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

        const res = await fetch("/api/competences", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, imageUrl, url: competenceUrl, level }),
        });
        if (res.ok) {
            const data = await res.json();
            onAddCompetence(data.competence);
            setName("");
            setImageFile(null);
            setCompetenceUrl("");
            setLevel(0);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold pb-2">Ajouter une compétence</h1>
            <form className="flex flex-col gap-2" onSubmit={addCompetence}>
                    <label htmlFor="title">Nom</label>
                    <input
                        className="border rounded"
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="level">Niveau</label>
                    <input
                        className="border rounded"
                        id="level"
                        type="number"
                        value={level}
                        onChange={e => setLevel(Number(e.target.value))}
                    />
                    <label htmlFor="competenceUrl">Lien</label>
                    <input
                        className="border rounded"
                        id="competenceUrl"
                        type="text"
                        value={competenceUrl}
                        onChange={e => setCompetenceUrl(e.target.value)}
                    />
                    <label htmlFor="competenceImage">Image</label>
                    <input type="file"
                        className="border rounded w-fit hover:cursor-pointer px-4 py-2"
                        id="competenceImage"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:cursor-pointer w-fit">Valider</button>
            </form>
            {success && <div style={{ color: "green" }}>Compétence ajoutée avec succès !</div>}
        </div>
    );
}