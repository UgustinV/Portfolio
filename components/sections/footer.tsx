export const FooterSection = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="flex justify-center p-4 text-sm">
            <p>© {year} Augustin Viard. Tous droits réservés.</p>
        </footer>
    )
}