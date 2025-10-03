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
        <div className="flex flex-col h-[100vh] items-center justify-center">
            <motion.h1
                initial={{ opacity: 0, y: "-100vw" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.2 }}
                className="text-5xl pb-2 animate-[--animate-slide-in]"
            >
                Augustin Viard
            </motion.h1>
            <motion.h2
                className="mb-[10vh] text-2xl"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.2 }}
            >
                Développeur Web
            </motion.h2>
            <motion.p
                className="text-center"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.6 }}
            >
                Je m'appelle Augustin, j'ai {age} ans et je suis Développeur Web freelance.
            </motion.p>
            <motion.p
                className="text-center"
                initial={{ opacity: 0, x: "100vw" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 30, delay: 0.8 }}
            >
                Naviguez sur le site pour en apprendre plus sur mes projets et mon parcours.
            </motion.p>
            <img className="w-20 h-20 mt-[25vh] animate-bounce" src="/white_arrow.svg" alt="Arrow" />
        </div>
    )
}