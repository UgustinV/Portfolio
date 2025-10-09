'use client'

import { useState } from 'react'

export const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
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
        setSubmitStatus('idle')
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
                setSubmitStatus('success')
                setFormData({ name: '', email: '', message: '' }) // Reset form
            } else {
                setSubmitStatus('error')
                setErrorMessage(result.error || 'Une erreur est survenue')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error)
            setSubmitStatus('error')
            setErrorMessage('Erreur de connexion. Veuillez réessayer.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="flex flex-col h-screen w-screen justify-center items-center p-8 bg-[#759be6] dark:bg-[#355492] relative">
            <h2 className="lg:absolute lg:top-[3vh] lg:left-[3vh] text-5xl font-bold mb-4">Contactez-moi</h2>
            <p className="text-2xl text-center max-w-4xl">Vous pouvez me contacter via le formulaire ci-dessous ou par email à <a className="hover:underline" href="mailto:augustin.viard0@gmail.com">augustin.viard0@gmail.com</a>.</p>
            
            {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 mt-4">
                    Merci ! Votre message a été envoyé avec succès. Je vous répondrai rapidement.
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4">
                    {errorMessage}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-[60vw] mt-12 lg:mt-0">
                <div>
                    <label htmlFor="name" className="block text-3xl mb-2">Votre Nom :</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded text-gray-900" 
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
                        className="w-full p-2 border border-gray-300 rounded text-gray-900" 
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
                        className="w-full p-2 border border-gray-300 rounded text-gray-900" 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-[#1a1d33] text-white px-4 py-2 rounded hover:bg-[#2a2d43] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </form>
        </section>
    )
}