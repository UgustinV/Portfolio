"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Project } from "@/app/generated/prisma";

import { ProjectCardsWrapper } from "@/components/project_cards_wrapper";
import { PresentationSection } from "@/components/sections/presentation";
import { LoginSection } from "@/components/sections/login";
import { FooterSection } from "@/components/sections/footer";
import { ContactSection } from "@/components/sections/contact";
import { SectionCompetences } from "@/components/sections/competences";
import { ManagingModale } from "@/components/managing_modale";
import { SectionParcours } from "@/components/sections/parcours";

export default function HomeClient({ projects: initialProjects } : { projects: Project[] }) {
    const { data: session } = useSession();
    const [projects, setProjects] = useState(initialProjects);
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

    const hideModale = (hide: boolean) => {
        setModaleHidden(hide);
    };

    return (
        <main>
            <PresentationSection/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#1a1d33] to-[#232a49]"/>
            <ProjectCardsWrapper projects={projects}/>
            {!modaleHidden ? (
                <ManagingModale projects={projects} onDeleteProject={handleDeleteProject} onEditProject={handleEditProject} onAddProject={handleAddProject} onHideModale={() => hideModale(true)}/>
            ) : modaleHidden && session?.user?.isAdmin ?
                <button className="fixed top-10 right-10 py-2 px-4 border rounded-lg hover:cursor-pointer font-bold text-xl" onClick={() => hideModale(false)}>Edition</button>
            : null
            }
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#232a49] to-[#2a3760]"/>
            <SectionCompetences/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#2a3760] to-[#304579]"/>
            <SectionParcours/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#304579] to-[#355492]"/>
            <ContactSection/>
            <div className="h-[15vh] w-full bg-gradient-to-b from-[#355492] to-[#1a1d33]"/>
            <LoginSection/>
            <FooterSection/>
        </main>
    );
}