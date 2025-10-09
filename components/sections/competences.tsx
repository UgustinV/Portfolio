import * as React from "react"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { Competence } from "@/app/generated/prisma"

const animation = { duration: 15000, easing: (t: number) => t }

export const SectionCompetences = ({ competences } : { competences: Competence[] }) => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "precision",
        drag: false,
        slides: {
            perView: 5,
            spacing: 15,
        },
        breakpoints: {
            "(max-width: 1600px)": {
              slides: {
                perView: 4,
                spacing: 12,
              },
            },
            "(max-width: 1024px)": {
            slides: {
                perView: 2,
                spacing: 12,
            },
            },
            "(max-width: 550px)": {
            slides: {
                perView: 1,
                spacing: 8,
            },
            },
      },
        created(s) {
            s.moveToIdx(5, true, animation)
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
    })
    return (
        <section className="bg-[#94b5ef] dark:bg-[#2a3760] min-h-screen py-20 flex flex-col items-center justify-center relative">
            <h2 className="absolute top-[3vh] lg:left-[3vh] text-5xl font-bold">
                Mes Compétences
            </h2>
            <div ref={sliderRef} className="keen-slider">
                {competences.map((competence) => (
                        <div key={competence.id} className="keen-slider__slide">
                            <a href={competence.url} target="_blank" rel="noopener noreferrer">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 h-80 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all duration-300 mx-2 gap-5">
                                    <img className="w-1/3" src={competence.imageUrl} alt={`Logo de ${competence.name}`} />
                                    <h3 className="text-4xl font-bold mb-2">
                                        {competence.name}
                                    </h3>
                                    <div className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-3 px-3 py-1 bg-blue-200 dark:bg-blue-500/20 rounded-full">
                                        {competence.level == 1 ? "Débutant" : competence.level == 2 ? "Intermédiaire" : competence.level == 3 ? "Avancé" : "Expert"}
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
            </div>
        </section>
    );
};
