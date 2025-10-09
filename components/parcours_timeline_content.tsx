import {
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import { HiAcademicCap } from "react-icons/hi";

export const ParcoursTimelineContent = () => {
    return (
        <>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-lg">2021 - 2022</TimelineTime>
                    <TimelineTitle className="text-2xl">DU Tremplin Sciences Exactes Sciences de l'ingénieur - Université de Lille</TimelineTitle>
                    <TimelineBody className="text-lg">
                        Ce diplôme m'a permis d'acquérir les bases en mathématiques, physique et informatique nécessaires pour intégrer une première année de licence SESI.
                    </TimelineBody>
                </TimelineContent>
                <TimelineContent>
                    <TimelineTitle  className="text-2xl">Stage découverte - Inria</TimelineTitle>
                    <TimelineBody className="text-lg">
                        Ce stage m'a permis de découvrir le monde de la recherche en informatique, et notamment le développement de nouveaux langages. Ici, j'ai découvert Pharo, un langage de programmation orienté objet.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-lg">2022 - 2023</TimelineTime>
                    <TimelineTitle  className="text-2xl">License 1 Sciences Exactes Sciences de l'ingénieur - Université de Lille</TimelineTitle>
                    <TimelineBody className="text-lg">
                        J'ai pu, grâce au DU Tremplin, intégrer directement la L1 SESI. J'y ai approfondi mes connaissances en mathématiques, physique et surtout en informatique.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-lg">2023 - 2024</TimelineTime>
                    <TimelineTitle  className="text-2xl">Licence 2 Informatique - Université de Lille</TimelineTitle>
                    <TimelineBody className="text-lg">
                        Cette année m'a permis de réellement approfondir les connaissances en informatique. J'y ai notamment fait beaucoup de programmation orientée objet, aussi bien en Java qu'en C. J'y ai également découvert React, NodeJS et SQL.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-lg">2024 - 2025</TimelineTime>
                    <TimelineTitle  className="text-2xl">Formation Développeur Web - OpenClassrooms</TimelineTitle>
                    <TimelineBody className="text-lg">
                        Cette formation m'a permis de conforter mes acquis en développement web front-end et backend. Elle m'a permis de développer des sites en React, JS, HTML, CSS et m'a fait découvrir SCSS que je ne connaissais pas jusque là.
                    </TimelineBody>
                </TimelineContent>
                <TimelineContent>
                    <TimelineTitle  className="text-2xl">Apprenti à la DREAL Hauts de France</TimelineTitle>
                    <TimelineBody className="text-lg">
                        J'ai participé au développement d'un outil interne de data visualisation et y ai découvert Django, Airflow, SuperSet ainsi que Docker.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
        </>
    )
}