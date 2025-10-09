"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Competence, Project } from "@/app/generated/prisma";

import { ProjectsSection } from "@/components/sections/projects";
import { PresentationSection } from "@/components/sections/presentation";
import { FooterSection } from "@/components/sections/footer";
import { ContactSection } from "@/components/sections/contact";
import { SectionCompetences } from "@/components/sections/competences";
import { ManagingModale } from "@/components/managing_modale";
import { SectionParcours } from "@/components/sections/parcours";

export default function HomeClient({ projects: initialProjects, competences: initialCompetences } : { projects: Project[], competences: Competence[] }) {
    const { data: session } = useSession();
    const [projects, setProjects] = useState(initialProjects);
    const [competences, setCompetences] = useState(initialCompetences);
    const [modaleHidden, setModaleHidden] = useState(true);

    useEffect(() => {
        if (session?.user?.isAdmin) {
            setModaleHidden(false);
        }
    }, [session]);

    const handleAddProject = (project : Project) => {
        setProjects(prev => [...prev, project]);
    };

    const handleEditProject = (project : Project) => {
        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
    };

    const handleDeleteProject = (project : Project) => {
        setProjects(prev => prev.filter(p => p.id !== project.id));
    };

    const handleAddCompetence = (competence: Competence) => {
        setCompetences(prev => [...prev, competence]);
    };

    const handleEditCompetence = (competence: Competence) => {
        setCompetences(prev => prev.map(p => p.id === competence.id ? competence : p));
    };

    const handleDeleteCompetence = (competence: Competence) => {
        setCompetences(prev => prev.filter(c => c.id !== competence.id));
    };

    const hideModale = (hide: boolean) => {
        setModaleHidden(hide);
    };

    return (
        <main className="text-black dark:text-white">
            <PresentationSection/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#b4cff8] to-[#a4c2f4] dark:from-[#1a1d33] dark:to-[#232a49]"/>
            <ProjectsSection projects={projects}/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#a4c2f4] to-[#94b5ef] dark:from-[#232a49] dark:to-[#2a3760]"/>
            <SectionCompetences competences={competences} />
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#94b5ef] to-[#84a8eb] dark:from-[#2a3760] dark:to-[#304579]"/>
            <SectionParcours/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#84a8eb] to-[#759be6] dark:from-[#304579] dark:to-[#355492]"/>
            <ContactSection/>
            <div className="h-[15vh] w-full bg-gradient-to-b from-[#759be6] to-[#a4c2f4] dark:from-[#355492] dark:to-[#1a1d33]"/>
            <FooterSection/>
            {!modaleHidden ? (
                <ManagingModale competences={competences} projects={projects} onDeleteProject={handleDeleteProject} onEditProject={handleEditProject} onAddProject={handleAddProject} onAddCompetence={handleAddCompetence} onDeleteCompetence={handleDeleteCompetence} onEditCompetence={handleEditCompetence} onHideModale={() => hideModale(true)}/>
            ) : modaleHidden && session?.user?.isAdmin ?
                <button className="fixed top-10 right-10 py-2 px-4 border rounded-lg hover:cursor-pointer font-bold text-xl" onClick={() => hideModale(false)}>Edition</button>
            : null
            }
        </main>
    );
}