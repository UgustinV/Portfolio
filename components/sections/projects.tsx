'use client';

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/app/generated/prisma";
import { ProjectCard } from "@/components/project_card";

type Props = {
    projects: Project[];
}

const gridRepeat = "1fr "

export const ProjectsSection = ({projects} : Props) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const [finalOffset, setFinalOffset] = useState(0);

    useEffect(() => {
        const updateOffset = () => {
        const totalWidth = (projects.length) * window.innerWidth;
        const viewportWidth = window.innerWidth;

        const offset = -(totalWidth - viewportWidth);
        setFinalOffset(offset);
        };

        updateOffset();
        window.addEventListener("resize", updateOffset);
        return () => window.removeEventListener("resize", updateOffset);
    }, [projects.length]);

    const x = useTransform(scrollYProgress, [0, 1], ["0px", `${finalOffset}px`]);

    const projectCards = projects.map((project) => (
        <ProjectCard 
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            projectUrl={project.projectUrl}
            imageUrl={project.imageUrl}
            tags={project.tags || []}
            createdAt={project.createdAt}
        />
    ));
    return(
        <section id="projects" className="bg-[#a4c2f4] dark:bg-[#232a49] h-[600vh]" ref={targetRef}>
            <div className="sticky top-0 h-screen flex flex-col justify-center">
                <div className="absolute left-0 top-0 w-full h-full flex justify-center">
                    <h2 className="absolute lg:left-[3vh] top-[3vh] text-5xl font-bold">Mes Projets</h2>
                </div>
                <div className="flex items-center justify-start overflow-hidden rounded-2xl">
                    <motion.div
                        className="grid grid-cols-[var(--projects-count)] grid-rows-[1fr]"
                        style={{
                            x,
                            ['--projects-count' as any]: gridRepeat.repeat(projects.length).trim()
                        }}
                    >
                        {projectCards}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}