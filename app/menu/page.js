import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router"
import LogoutButton from "../ui/logoutBtn"
import { Suspense } from "react"
import { MultipleRectSkeleton } from "../ui/skeletons"
import FavoriteMovies from "../ui/favoriteMovies"
import FormExample from "../ui/formExample"
import AccountAndOrgButtons from "../ui/accountBtns"
import FavMovieFormExample from "../ui/favMovieFormExample"

export default async function Home() {
    const user = await getUserOrRedirect()

    return (
        <div className="w-full h-full p-4 bg-neutral-100 overflow-hidden">
            <div className="w-full h-full flex flex-col max-w-5xl gap-6 mx-auto">
                <div className="w-full h-fit flex flex-row justify-between items-center">
                    <span className="font-black text-xl text-neutral-900">
                        NextJS Starter
                    </span>
                    <div className="w-fit h-fit flex flex-row gap-4">
                        <AccountAndOrgButtons/>
                        <LogoutButton/>
                    </div>
                </div>
                <div className="w-full h-full flex flex-row gap-4">
                    <FormExample/>
                    <div className="w-full h-full flex flex-col gap-4">
                        <FavMovieFormExample/>
                        <Suspense fallback={<MultipleRectSkeleton/>}>
                            <FavoriteMovies/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
};