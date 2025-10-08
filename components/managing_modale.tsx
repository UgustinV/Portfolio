import { Project, Competence } from "@/app/generated/prisma";
import { useState } from "react";
import { EditForm } from "@/components/edit_project_form";
import { EditCompetencesForm } from "@/components/edit_competences_form";
import { ProjectsForm } from "@/components/projects_form";
import { CompetencesForm } from "@/components/comptetences_form";
import { projectApi, competenceApi, imageApi } from "@/lib/api";

type Props = {
    competences: Competence[];
    projects: Project[];
    onDeleteProject: (project: Project) => void;
    onEditProject: (project: Project) => void;
    onAddProject: (project: Project) => void;
    onDeleteCompetence: (competence: Competence) => void;
    onEditCompetence: (competence: Competence) => void;
    onAddCompetence: (competence: Competence) => void;
    onHideModale: (hide: Boolean) => void;
}

export const ManagingModale = ({ 
    competences: initialCompetences, 
    projects: initialProjects, 
    onDeleteProject, 
    onEditProject, 
    onAddProject,
    onDeleteCompetence,
    onEditCompetence,
    onAddCompetence,
    onHideModale 
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [projects, setProjects] = useState(initialProjects);
    const [editProject, setEditProject] = useState<Project | null>(null);
    const [competences, setCompetences] = useState(initialCompetences);
    const [editCompetence, setEditCompetence] = useState<Competence | null>(null);

    const handleAddProject = (project: Project) => {
        setProjects(prev => [...prev, project]);
        onAddProject(project);
    };

    const handleEditProject = (project: Project) => {
        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        setIsEditing(false);
        onEditProject(project);
    };

    const handleAddCompetence = (competence: Competence) => {
        setCompetences(prev => [...prev, competence]);
        onAddCompetence(competence);
    };

    const handleEditCompetence = (competence: Competence) => {
        setCompetences(prev => prev.map(p => p.id === competence.id ? competence : p));
        setIsEditing(false);
        onEditCompetence(competence);
    };

    const deleteProject = async (project: Project) => {
        const success = await projectApi.delete(project.id);
        if (success) {
            if (project.imageUrl) {
                await imageApi.delete(project.imageUrl);
            }
            onDeleteProject(project);
            setProjects(prev => prev.filter(p => p.id !== project.id));
        }
    };

    const deleteCompetence = async (competence: Competence) => {
        const success = await competenceApi.delete(competence.id);
        if (success) {
            if (competence.imageUrl) {
                await imageApi.delete(competence.imageUrl);
            }
            onDeleteCompetence(competence);
            setCompetences(prev => prev.filter(c => c.id !== competence.id));
        }
    };

    return (
        <div className="fixed top-10 bottom-10 z-50 w-full overflow-y-hidden rounded">
            <div className="flex flex-col bg-[#46464686] mx-[5vw] p-6 rounded-lg shadow-lg w-[90vw] h-full overflow-y-scroll">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold mb-4">Gérer les Projets</h2>
                    <button 
                        className="text-2xl mb-4 hover:cursor-pointer border rounded-lg px-2 py-1" 
                        onClick={() => onHideModale(true)}
                    >
                        Fermer
                    </button>
                </div>
                
                {isEditing && editProject ? (
                    <>
                        <button 
                            className="mb-4 bg-gray-600 px-4 py-2 rounded hover:cursor-pointer w-fit" 
                            onClick={() => setIsEditing(false)}
                        >
                            Fermer le mode édition
                        </button>
                        <EditForm project={editProject} onUpdate={handleEditProject} />
                    </>
                ) : (
                    <>
                        {projects.map((project) => (
                            <div key={project.id} className="mb-4 p-4 border rounded-lg">
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                <p className="mb-2">{project.description}</p>
                                <div className="flex gap-2">
                                    <button 
                                        className="bg-red-600 text-white px-4 py-2 rounded" 
                                        onClick={() => deleteProject(project)}
                                    >
                                        Supprimer
                                    </button>
                                    <button 
                                        className="bg-blue-600 text-white px-4 py-2 rounded" 
                                        onClick={() => {
                                            setIsEditing(true);
                                            setEditProject(project);
                                        }}
                                    >
                                        Modifier
                                    </button>
                                </div>
                            </div>
                        ))}
                        <ProjectsForm onAddProject={handleAddProject} />
                    </>
                )}
                <h2 className="text-2xl font-bold mb-4 mt-8">Gérer les Compétences</h2>
                {isEditing && editCompetence ? (
                    <>
                        <button 
                            className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:cursor-pointer w-fit" 
                            onClick={() => setIsEditing(false)}
                        >
                            Fermer le mode édition
                        </button>
                        <EditCompetencesForm competence={editCompetence} onUpdate={handleEditCompetence} />
                    </>
                ) : (
                <>
                {competences.map((competence) => (
                    <div key={competence.id} className="mb-4 p-4 border rounded-lg">
                        <h3 className="text-xl font-semibold">{competence.name}</h3>
                        <div className="flex gap-2">
                            <button 
                                className="bg-red-600 text-white px-4 py-2 rounded" 
                                onClick={() => deleteCompetence(competence)}
                            >
                                Supprimer
                            </button>
                            <button 
                                className="bg-blue-600 text-white px-4 py-2 rounded" 
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditCompetence(competence);
                                }}
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                ))}
                </>
                )}
                <CompetencesForm onAddCompetence={handleAddCompetence} />
            </div>
        </div>
    );
}