import { LoginSection } from "@/components/sections/login";

export const FooterSection = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="flex flex-col justify-center items-center p-4 text-sm bg-[#a4c2f4] dark:bg-[#1a1d33] gap-2">
            <LoginSection/>
            <p>© {year} Augustin Viard. Tous droits réservés.</p>
        </footer>
    )
}