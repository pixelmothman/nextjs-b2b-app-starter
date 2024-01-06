import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router"

export default async function MessageReceived({ searchParams }){
    const user = await getUserOrRedirect();


    return (
        <div className="w-full h-full p-4 bg-neutral-100  overflow-hidden">
            <div className="w-full h-full flex flex-col max-w-5xl gap-6 mx-auto">
                <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
                    <span className="font-black text-xl text-zinc-200">
                     {searchParams.message}
                    </span>
                </div>
            </div>
        </div>
    )
};