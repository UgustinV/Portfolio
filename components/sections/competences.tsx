import * as React from "react"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { Competence } from "@/app/generated/prisma"

const animation = { duration: 3000, easing: (t: number) => t }

export const SectionCompetences = ({ competences } : { competences: Competence[] }) => {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "precision",
        drag: false,
        slides: {
            perView: 4,
            spacing: 15,
        },
        created(s) {
            s.moveToIdx(1, true, animation)
        },
        updated(s) {
            s.moveToIdx(s.track.details.abs + 1, true, animation)
        },
        animationEnded(s) {
            s.moveToIdx(s.track.details.abs + 1, true, animation)
        },
    })
    return (
        <section className="bg-[#2a3760] min-h-screen py-20 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-white text-center mb-12">
                Mes Compétences
            </h2>
            <div ref={sliderRef} className="keen-slider">
                {competences.map((competence) => (
                        <div key={competence.id} className="keen-slider__slide">
                            <a href={competence.url} target="_blank" rel="noopener noreferrer">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 h-80 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all duration-300 mx-2 gap-5">
                                    <img className="w-1/3" src={competence.imageUrl} alt={competence.name} />
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {competence.name}
                                    </h3>
                                    <div className="text-sm text-blue-300 mb-3 px-3 py-1 bg-blue-500/20 rounded-full">
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
