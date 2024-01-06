export function RectSkeleton(height) {
    return (
        <div className={`w-full ${height} bg-zinc-400 rounded-md overflow-hidden`}>
            <div className="w-full h-full bg-gradient-to-r from-zinc-300 to-zinc-600 opacity-75 animate-shimmer"/>
        </div>   
    )
}

export function MultipleRectSkeleton(){
    return (
        <div className="relative w-full h-fit rounded-md overflow-hidden">
            <div className="before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-zinc-200 before:to-transparent"/>
            <div className="flex flex-col gap-4 ">
                <div className={`w-full h-16 p-4 flex flex-row justify-between items-center bg-zinc-600 rounded-md overflow-hidden`}>
                    <div className="w-fit h-full flex flex-row gap-2">
                        <div className="w-24 h-full bg-zinc-800 rounded-xl"/>
                        <div className="w-24 h-full bg-zinc-800 rounded-xl"/>
                    </div>
                    <div className="w-36 h-full bg-zinc-700 rounded-md"/>
                </div>
                <div className={`w-full h-16 p-4 flex flex-row justify-between items-center bg-zinc-600 rounded-md overflow-hidden`}>
                    <div className="w-fit h-full flex flex-row gap-2">
                        <div className="w-24 h-full bg-zinc-800 rounded-xl"/>
                        <div className="w-24 h-full bg-zinc-800 rounded-xl"/>
                    </div>
                    <div className="w-36 h-full bg-zinc-700 rounded-md"/>
                </div>
                <div className={`w-full h-16 p-4 flex flex-row justify-between items-center bg-zinc-600 rounded-md overflow-hidden`}>
                    <div className="w-fit h-full flex flex-row gap-2">
                        <div className="w-24 h-full bg-zinc-800 rounded-xl"/>
                        <div className="w-24 h-full bg-zinc-800 rounded-xl"/>
                    </div>
                    <div className="w-36 h-full bg-zinc-700 rounded-md"/>
                </div>
            </div>
        </div>
    )
}