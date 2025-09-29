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
            <h1 className="text-5xl pb-2">Augustin Viard</h1>
            <h2 className="mb-[10vh] text-2xl">Développeur Web</h2>
            <p className="text-center">Je m'appelle Augustin, j'ai {age} ans et je suis Développeur Web freelance.</p>
            <p className="text-center">Naviguez sur le site pour en apprendre plus sur mes projets et mon parcours.</p>
            <img className="w-20 h-20 mt-[25vh]" src="/white_arrow.svg" alt="Arrow" />
        </div>
    )
}