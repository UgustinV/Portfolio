'use client'

import { useState } from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setErrorMessage('')

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (response.ok) {
                setFormData({ name: '', email: '', message: '' })
                setSuccess(true)
                setTimeout(() => setSuccess(false), 8000);
            } else {
                setErrorMessage(result.error || 'Une erreur est survenue')
                setError(true)
                setTimeout(() => setError(false), 8000);
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error)
            setErrorMessage('Erreur de connexion. Veuillez réessayer.')
            setError(true)
            setTimeout(() => setError(false), 8000);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id='contact' className="flex flex-col h-screen w-full justify-center items-center bg-[#759be6] dark:bg-[#355492] relative">
            <h2 className="lg:absolute lg:top-[3vh] lg:left-[3vh] text-5xl font-bold mb-4">Contactez-moi</h2>
            {success && (
                <div className="opacity-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute top-[5vh] animate-fade-in-out">
                    Merci ! Votre message a été envoyé avec succès. Je vous répondrai rapidement.
                </div>
            )}
            {error && (
                <div className="opacity-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 animate-fade-in-out">
                    {errorMessage}
                </div>
            )}
            <p className="text-2xl text-center max-w-4xl">Vous pouvez me contacter via le formulaire ci-dessous en suivant les liens suivants :</p>
            <ul className='flex flex-row items-center gap-[10vw] lg:gap-[2vw]'>
                <li className="text-2xl mt-4"><a className="hover:underline" href="mailto:augustin.viard0@gmail.com" target="_blank" rel="noopener noreferrer"><IoIosMail className="inline-block mr-2" size="5vh" title="Lien d'envoi d'email" /></a></li>
                <li className="text-2xl mt-2"><a className="hover:underline" href="https://www.linkedin.com/in/augustin-viard-1a365b314/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="inline-block mr-2" size="5vh" title='Lien vers mon profil linkedin' /></a></li>
                <li className="text-2xl mt-2"><a className="hover:underline" href="https://github.com/UgustinV" target="_blank" rel="noopener noreferrer"><FaGithub className="inline-block mr-2" size="5vh" title='Lien vers mon profil github' /></a></li>
            </ul>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-10 w-[95vw] lg:w-[60vw] mt-12 lg:mt-0">
                <div>
                    <label htmlFor="name" className="block text-3xl mb-2">Votre Nom :</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border text-2xl border-white rounded text-black dark:text-white" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-3xl mb-2">Votre Email :</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border text-2xl border-white rounded text-black dark:text-white" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-3xl mb-2">Votre Message :</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full p-2 border text-2xl border-white rounded text-black dark:text-white" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-[#b4cff8] dark:bg-[#1a1d33] text-black dark:text-white text-2xl px-4 py-2 rounded hover:bg-[#a4c2f4] dark:hover:bg-[#232a49] disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>
        </section>
    )
}