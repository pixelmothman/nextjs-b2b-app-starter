import { Suspense } from "react"
import { MultipleRectSkeleton } from "../ui/skeletons"
import FavoriteMovies from "../ui/favoriteMovies"
import FormExample from "../ui/formExample"
import FavMovieFormExample from "../ui/favMovieFormExample"

export default async function Home() {

    return (
        <div className="w-full h-full flex flex-row gap-4">
            <FormExample/>
            <div className="w-full h-full flex flex-col gap-4">
                <FavMovieFormExample/>
                <Suspense fallback={<MultipleRectSkeleton/>}>
                    <FavoriteMovies/>
                </Suspense>
            </div>
        </div>
    )
};