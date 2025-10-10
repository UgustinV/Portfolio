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
        <section id="accueil" className="bg-[#b4cff8] dark:bg-[#1a1d33] flex flex-col h-screen items-center justify-between pt-[5vh] md:px-[5vh]">
            <div className="flex flex-col justify-center items-center">
                <motion.h1
                    initial={{ opacity: 0, y: "-100vw" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 30, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-9xl pb-2 animate-[--animate-slide-in]"
                >
                    Augustin Viard
                </motion.h1>
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl"
                    initial={{ opacity: 0, x: "100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 30, delay: 0.2 }}
                >
                    Développeur Web - Full Stack
                </motion.h2>
            </div>
            <motion.p
                className="text-center mx-3 text-xl md:text-2xl lg:text-3xl"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.6 }}
            >
                Je m'appelle Augustin, j'ai {age} ans et je suis Développeur Web Full Stack en freelance.
            </motion.p>
            <div>
                <motion.p
                    className="text-center mx-3 text-xl md:text-2xl lg:text-3xl"
                    initial={{ opacity: 0, x: "100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 30, delay: 0.7 }}
                >
                    J'ai toujours été passionné par l'informatique et la découverte du développement web il y a quelques années m'a comblé :
                </motion.p>
                <motion.p
                    className="text-center mx-3 text-xl md:text-2xl lg:text-3xl"
                    initial={{ opacity: 0, x: "100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 30, delay: 0.8 }}
                >
                    Ça m'a permis d'allier créativité et logique dans mes projets !
                </motion.p>
            </div>
            <div>
                <motion.p
                    className="text-center mx-3 text-xl md:text-2xl lg:text-3xl"
                    initial={{ opacity: 0, x: "100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 30, delay: 0.9 }}
                >
                    Je serais ravi de vous accompagner dans la réalisation de vos projets web.
                </motion.p>
                <motion.p
                    className="text-center mx-3 text-xl md:text-2xl lg:text-3xl"
                    initial={{ opacity: 0, x: "100vw" }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 30, delay: 1 }}
                >
                    Naviguez sur mon portfolio pour découvrir mon parcours, mes compétences et mes réalisations, ou pour me contacter.
                </motion.p>
            </div>
            <img 
                className="w-20 md:w-30 lg:w-40 animate-bounce dark:block hidden" 
                src="/white_arrow.svg" 
                alt="Flèche blanche pointant vers le bas"
            />
            <img 
                className="w-20 md:w-30 lg:w-40 animate-bounce block dark:hidden" 
                src="/black_arrow.svg" 
                alt="Flèche noire pointant vers le bas"
            />
        </section>
    )
}