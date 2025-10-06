"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ProjectCardProps {
id: string;
title: string;
description: string;
projectUrl: string;
imageUrl: string;
createdAt?: string | Date;
}

type Controls = ReturnType<typeof useAnimation>;

export const ProjectCard = ({
    id,
    title,
    description,
    projectUrl,
    imageUrl,
}: ProjectCardProps) => {
    const overlayControls: Controls = useAnimation();
    const descControls: Controls = useAnimation();
    const imageControls: Controls = useAnimation();

    const overlayRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [titleHeight, setTitleHeight] = useState(0);
    const [descHeight, setDescHeight] = useState(0);

    useEffect(() => {
        const setupImageAnimation = async () => {
        const img = imageRef.current;
        const container = containerRef.current;
        if (!img || !container) return;

        if (!img.complete) {
            await new Promise(resolve => {
            img.onload = resolve;
            });
        }

        const scrollAmount = Math.max(0, img.offsetHeight - container.offsetHeight);

        if (scrollAmount > 0) {
            imageControls.start({
            y: [0, -scrollAmount, 0],
            transition: {
                duration: 40,
                times: [0, 0.5, 1],
                ease: "linear",
                repeat: Infinity
            }
            });
        }
        };
        
        setupImageAnimation();
    }, [imageControls]);

    useEffect(() => {
        const measure = () => {
        const titleEl = titleRef.current;
        const descEl = descRef.current;
        if (!titleEl || !descEl) return;

        setTitleHeight(titleEl.offsetHeight);
        setDescHeight(descEl.scrollHeight);

        overlayControls.set({ height: titleEl.offsetHeight + 32 });
        descControls.set({ opacity: 0 });
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [overlayControls, descControls]);

    const handleHoverStart = () => {
        overlayControls.start({
        height: titleHeight + descHeight + 48,
        transition: { duration: 0.3, ease: "easeOut" },
        });
        
        descControls.start({
        opacity: 1,
        transition: { duration: 0.2, delay: 0.1 },
        });
    };

    const handleHoverEnd = () => {
        overlayControls.start({
        height: titleHeight + 32,
        transition: { duration: 0.3, ease: "easeOut" },
        });
        
        descControls.start({
        opacity: 0,
        transition: { duration: 0.2 },
        });
    };

    return (
        <motion.div
            className="flex flex-col w-[96vw] ml-[2vw] mr-[2vw] rounded-2xl shadow-md hover:shadow-2xl lg:w-[76vw] lg:ml-[12vw] lg:mr-[12vw] overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <div ref={containerRef} className="relative h-[40vh] lg:h-[80vh]">
            <motion.a
                className="absolute inset-0 block text-white overflow-hidden"
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
            >
                <motion.img
                    ref={imageRef}
                    className="absolute w-full h-auto object-cover object-top"
                    src={imageUrl}
                    alt={`Image du projet ${title}`}
                    animate={imageControls}
                    initial={{ y: 0 }}
                />
                <motion.div
                    ref={overlayRef}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-6 py-4"
                    animate={overlayControls}
                >
                    <div className="relative">
                        <h2 ref={titleRef} className="text-2xl lg:text-5xl leading-tight mb-4">
                            {title}
                        </h2>
                        <motion.div
                            ref={descRef}
                            className="text-sm lg:text-2xl"
                            animate={descControls}
                            initial={{ opacity: 0 }}
                        >
                            {description}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.a>
        </div>
        </motion.div>
    );
};

export default ProjectCard;