// lib/api.ts
import { Project, Competence } from "@/app/generated/prisma";

export const projectApi = {
async delete(id: string): Promise<boolean> {
    const res = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    return res.ok;
},

async update(id: string, data: Partial<Project>): Promise<Project | null> {
    const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
    });
    
    if (res.ok) {
        const result = await res.json();
        return result.project;
    }
    return null;
},

async create(data: Omit<Project, 'id' | 'createdAt'>): Promise<Project | null> {
    const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    
    if (res.ok) {
        const result = await res.json();
        return result.project;
    }
    return null;
}
};

export const competenceApi = {
async delete(id: string): Promise<boolean> {
    const res = await fetch("/api/competences", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
    });
    return res.ok;
},

async update(id: string, data: Partial<Competence>): Promise<Competence | null> {
    const res = await fetch("/api/competences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...data }),
    });
    
    if (res.ok) {
        const result = await res.json();
        return result.competence;
    }
    return null;
},

async create(data: Omit<Competence, 'id' | 'createdAt'>): Promise<Competence | null> {
    const res = await fetch("/api/competences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    });
    
    if (res.ok) {
        const result = await res.json();
        return result.competence;
    }
    return null;
}
};

export const imageApi = {
async delete(imageUrl: string): Promise<boolean> {
    const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imageUrl),
    });
    return res.ok;
},

async upload(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        return data.url;
    }
    return null;
}
};