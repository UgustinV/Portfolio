import { signIn, signOut, useSession } from "next-auth/react";

export const LoginSection = () => {
    const { data: session } = useSession();
    return (
        <div className="w-full">
            {!session ? (
                <button className="flex justify-baseline w-fit p-2.5  hover:cursor-pointer text-sm" onClick={() => signIn("github")}>GitHub login (admin)</button>
            ) : (
                <div className="flex justify-between items-center p-2.5 text-sm w-full">
                    <h2>Connecté en tant que {session.user?.name}</h2>
                    <button className="hover:cursor-pointer" onClick={() => signOut()}>Se déconnecter</button>
                </div>
            )}
        </div>
    )
}