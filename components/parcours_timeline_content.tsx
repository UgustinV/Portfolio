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
                    <TimelineTime className="text-xl font-bold text-gray-700 dark:text-gray-300" dateTime="2021">2021 - 2022</TimelineTime>
                    <TimelineTitle className="text-3xl">DU Tremplin Sciences Exactes Sciences de l'ingénieur - Université de Lille</TimelineTitle>
                    <TimelineBody className="text-2xl text-neutral-700 dark:text-gray-300">
                        Ce diplôme m'a permis d'acquérir les bases en mathématiques, physique et informatique nécessaires pour intégrer une première année de licence SESI.
                    </TimelineBody>
                </TimelineContent>
                <TimelineContent>
                    <TimelineTitle  className="text-3xl">Stage découverte - Inria</TimelineTitle>
                    <TimelineBody className="text-2xl text-neutral-700 dark:text-gray-300">
                        Ce stage avait pour but la découverte du monde de la recherche en informatique, et notamment le développement de nouveaux langages. Ici, j'ai découvert Pharo, un langage de programmation orienté objet.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-xl font-bold text-gray-700 dark:text-gray-300" dateTime="2022">2022 - 2023</TimelineTime>
                    <TimelineTitle  className="text-3xl">License 1 Sciences Exactes Sciences de l'ingénieur - Université de Lille</TimelineTitle>
                    <TimelineBody className="text-2xl text-neutral-700 dark:text-gray-300">
                        J'ai pu, grâce au DU Tremplin, intégrer directement la L1 SESI. J'y ai approfondi mes connaissances en mathématiques, physique et surtout en informatique.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-xl font-bold text-gray-700 dark:text-gray-300" dateTime="2023">2023 - 2024</TimelineTime>
                    <TimelineTitle  className="text-3xl">Licence 2 Informatique - Université de Lille</TimelineTitle>
                    <TimelineBody className="text-2xl text-neutral-700 dark:text-gray-300">
                        L'année de licence 2 était une année charnière puisqu'elle constituait l'approfondissement des connaissances en informatique et la spécialisation dans le domaine. J'y ai notamment fait beaucoup de programmation orientée objet, aussi bien en Java qu'en C. J'y ai également découvert React, NodeJS et SQL.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={HiAcademicCap} />
                <TimelineContent>
                    <TimelineTime className="text-xl font-bold text-gray-700 dark:text-gray-300" dateTime="2024">2024 - 2025</TimelineTime>
                    <TimelineTitle  className="text-3xl">Formation Développeur Web - OpenClassrooms</TimelineTitle>
                    <TimelineBody className="text-2xl text-neutral-700 dark:text-gray-300">
                        J'ai ici conforté mes acquis en développement web front-end et backend. Elle m'a appris à développer des sites en React, JS, HTML, CSS et m'a fait découvrir SCSS que je ne connaissais pas jusque là. J'y ai également appris à développer des API REST en NodeJS avec Express et à utiliser une base de données SQL (PostgreSQL).
                    </TimelineBody>
                </TimelineContent>
                <TimelineContent>
                    <TimelineTitle  className="text-3xl">Apprenti à la DREAL Hauts de France</TimelineTitle>
                    <TimelineBody className="text-2xl text-neutral-700 dark:text-gray-300">
                        Le principal projet auquel j'ai participé était le développement d'un outil interne de data visualisation des rejets de polluants dans les eaux et l'air de France. J'y ai découvert Django, Airflow, SuperSet ainsi que Docker et GitLab CI/CD.
                    </TimelineBody>
                </TimelineContent>
            </TimelineItem>
        </>
    )
}