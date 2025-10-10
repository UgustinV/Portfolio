import { motion } from "framer-motion";

export const PresentationSection = () => {
    const date = new Date();
    const {day, month, year} = {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};
    let age = 0
    if(month == 1 && day < 25){
        age = year - 2002;
    }
    else {
        age = year - 2001;
    }
    return (
        <section id="accueil" className="bg-[#b4cff8] dark:bg-[#1a1d33] flex flex-col h-[100vh] items-center justify-center">
            <motion.h1
                initial={{ opacity: 0, y: "-100vw" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.2 }}
                className="text-5xl lg:text-9xl pb-2 animate-[--animate-slide-in]"
            >
                Augustin Viard
            </motion.h1>
            <motion.h2
                className="mb-[10vh] text-3xl lg:text-5xl"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.2 }}
            >
                Développeur Web - Full Stack
            </motion.h2>
            <motion.p
                className="text-center mx-3 text-xl lg:text-3xl"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.6 }}
            >
                Je m'appelle Augustin, j'ai {age} ans et je suis Développeur Web Full Stack en freelance.
            </motion.p>
            <motion.p
                className="text-center mt-[5vh] mx-3 text-xl lg:text-3xl"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.8 }}
            >
                Je serais ravi de vous accompagner dans la réalisation de vos projets web.
            </motion.p>
            <motion.p
                className="text-center mt-[5vh] mx-3 text-xl lg:text-3xl"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.9 }}
            >
                Naviguez sur mon portfolio pour découvrir mon parcours, mes compétences et mes réalisations, ou pour me contacter.
            </motion.p>
            <img 
                className="w-20 lg:w-40 mt-[25vh] lg:mt-[20vh] animate-bounce dark:block hidden" 
                src="/white_arrow.svg" 
                alt="Flèche blanche pointant vers le bas"
            />
            <img 
                className="w-20 lg:w-40 mt-[25vh] lg:mt-[20vh] animate-bounce block dark:hidden" 
                src="/black_arrow.svg" 
                alt="Flèche noire pointant vers le bas"
            />
        </section>
    )
}