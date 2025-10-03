import { Project } from "@/app/generated/prisma";
import { useState } from "react";
import { EditForm } from "@/components/edit_form";
import { ProjectsForm } from "@/components/projects_form";

type Props = {
    projects: Project[];
    onDeleteProject: (project: Project) => void;
    onEditProject: (project: Project) => void;
    onAddProject: (project: Project) => void;
    onHideModale: (hide: Boolean) => void;
}

export const ManagingModale = ({ projects: initialProjects, onDeleteProject, onEditProject, onAddProject, onHideModale }: Props) => {
    const [projects, setProjects] = useState(initialProjects)
    const [isEditing, setIsEditing] = useState(false);
    const [editProject, setEditProject] = useState<Project | null>(null);

     const handleAddProject = (project : Project) => {
        setProjects(prev => [...prev, project]);
        onAddProject(project)
    };

    const handleEditProject = (project : Project) => {
        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        setIsEditing(false);
        onEditProject(project);
    };

    const deleteProject = async (project: Project) => {
        const id = project.id
        const res = await fetch("/api/projects", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            const deletedImage = await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project.imageUrl),
            });
            if (deletedImage.ok) {
                onDeleteProject(project);
                setProjects(prev => prev.filter(p => p.id !== project.id));
            }
        }
    };

    return (
        <div className="fixed top-10 bottom-10 z-50 w-full overflow-y-hidden rounded">
            <div className="flex flex-col bg-[#46464686] mx-[5vw] p-6 rounded-lg shadow-lg w-[90vw] h-full overflow-y-scroll">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
                    <button className="text-2xl mb-4 hover:cursor-pointer border rounded-lg px-2 py-1" onClick={() => onHideModale(true)}>Fermer</button>
                </div>
                {isEditing && editProject ?
                    <>
                        <button className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer w-fit" onClick={() => setIsEditing(false)}>Fermer le mode édition</button>
                        <EditForm project={editProject} onUpdate={handleEditProject}/>
                    </>
                :
                    <>
                    {projects.map((project) => (
                        <div key={project.id} className="mb-4 p-4 border rounded-lg">
                            <h3 className="text-xl font-semibold">{project.title}</h3>
                            <p className="mb-2">{project.description}</p>
                            <div className="flex gap-2">
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => deleteProject(project)}>
                                    Delete
                                </button>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {
                                    setIsEditing(true)
                                    setEditProject(project)
                                }}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                    <ProjectsForm onAddProject={handleAddProject}/>
                    </>
                }
            </div>
        </div>
    );
}