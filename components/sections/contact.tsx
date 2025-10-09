export const ContactSection = () => {
    return (
        <section className="flex flex-col h-screen items-center p-8 bg-[#759be6] dark:bg-[#355492] relative">
            <h2 className="lg:absolute lg:top-[3vh] lg:left-[3vh] text-5xl font-bold mb-4">Contactez-moi</h2>
            <form action="POST">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-lg mb-2">Nom</label>
                    <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-lg mb-2">Email</label>
                    <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-lg mb-2">Message</label>
                    <textarea id="message" name="message" className="w-full p-2 border border-gray-300 rounded" required></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Envoyer</button>
            </form>
        </section>
    )
}