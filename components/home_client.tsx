"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Project } from "@/app/generated/prisma";
import { ProjectCardsWrapper } from "@/components/project_cards_wrapper";
import { ProjectsForm } from "@/components/projects_form";
import { PresentationSection } from "@/components/sections/presentation";
import { LoginSection } from "@/components/sections/login";
import { FooterSection } from "@/components/sections/footer";
import { ContactSection } from "@/components/sections/contact";
import { SectionCompetences } from "@/components/sections/competences";

export default function HomeClient({ projects: initialProjects } : { projects: Project[] }) {
    const { data: session } = useSession();
    const [projects, setProjects] = useState(initialProjects);
    const handleAddProject = (project : Project) => {
        setProjects(prev => [...prev, project]);
    };

    const handleEditProject = (project : Project) => {
        console.log("Editing Project:", project);
        console.log("Current Projects List:", projects.map(p => p.id));
        setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        console.log("Updated Projects List:", projects.map(p => p.id));
    };

    const handleDeleteProject = (project : Project) => {
        setProjects(prev => prev.filter(p => p.id !== project.id));
    };
    return (
        <div>
            <PresentationSection/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#1a1d33] to-[#232a49]"/>
            <ProjectCardsWrapper projects={projects} onDeleteProject={handleDeleteProject} onEditProject={handleEditProject}/>
            {session?.user?.isAdmin ? (
                <ProjectsForm onAddProject={handleAddProject}/>
            ) : null}
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#232a49] to-[#2a3760]"/>
            <SectionCompetences/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#2a3760] to-[#304579]"/>
            <ContactSection/>
            <div className="h-[10vh] w-full bg-gradient-to-b from-[#304579] to-[#1a1d33]"/>
            <LoginSection/>
            <FooterSection/>
        </div>
    );
}