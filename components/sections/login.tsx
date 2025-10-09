import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { deleteAccount } from "@/lib/api";

export const LoginSection = () => {
    const { data: session } = useSession();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleDeleteAccount = async () => {
        const res = await deleteAccount();
        if (res) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 8000);
        } else {
            setError("Une erreur est survenue lors de la suppression du compte.");
            setTimeout(() => setError(""), 8000);
        }
    };

    return (
        <div className="w-full">
            {!session ? (
                <button className="flex justify-baseline w-fit p-2.5  hover:cursor-pointer" onClick={() => signIn("github")}>GitHub login (admin)</button>
            ) : (
                <div className="flex justify-between items-center p-2.5 w-full relative">
                    {success && (
                        <div className="absolute opacity-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded top-[5vh] animate-fade-in-out">
                            Votre compte a été supprimé avec succès.
                        </div>
                    )}
                    {error && (
                        <div className="absolute opacity-0 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mt-4 animate-fade-in-out">
                            {error}
                        </div>
                    )}
                    <h2>Connecté en tant que {session.user?.name}</h2>
                    <div className="flex gap-4">
                        <button className="hover:cursor-pointer text-red-600" onClick={() => {handleDeleteAccount()}}>Supprimer le compte</button>
                        <button className="hover:cursor-pointer" onClick={() => signOut()}>Se déconnecter</button>
                    </div>
                </div>
            )}
        </div>
    )
}