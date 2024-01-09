import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router"

export default async function MessageReceived({ searchParams }){
    const user = await getUserOrRedirect();

    let messageArray = searchParams.message.split("_");

    let message = `Hello ${messageArray[0]}. You are ${messageArray[1]} years old, and your favorite movie genre is ${messageArray[2]}.`;

    return (
        <div className="w-full h-full p-4 bg-neutral-100  overflow-hidden">
            <div className="w-full h-full flex flex-col max-w-5xl gap-6 mx-auto">
                <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
                    <span className="font-black text-xl text-zinc-200">
                     {message}
                    </span>
                </div>
            </div>
        </div>
    )
};