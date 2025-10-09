'use client'

import {
  Timeline,
} from "flowbite-react";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParcoursTimelineContent } from "@/components/parcours_timeline_content";

export const SectionParcours = () => {
    const targetRef = useRef(null);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-100vw`]);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <section 
            className={`bg-[#84a8eb] dark:bg-[#304579] ${isLargeScreen ? 'h-[200vw]' : 'min-h-screen py-20'}`} 
            ref={targetRef}
        >
            {isLargeScreen ? (
                <div className="sticky top-0 h-screen flex flex-col">
                    <div className="h-[35vh] flex justify-start">
                        <h2 className="pl-[3vh] top-0 text-5xl font-bold">Mon Parcours</h2>
                    </div>
                    <div className="flex items-center justify-start overflow-hidden pl-[6vh] pt-[3vh]">
                        <motion.div className="flex gap-8 w-[200vw]" style={{ x }}>
                            <Timeline horizontal className="flex w-[200vw] pr-[6vh]">
                                <ParcoursTimelineContent />
                            </Timeline>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <div className="px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold">Mon Parcours</h2>
                    </div>
                    <div className="flex justify-center">
                        <Timeline>
                            <ParcoursTimelineContent />
                        </Timeline>
                    </div>
                </div>
            )}
        </section>
    )
}