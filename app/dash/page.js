import { Suspense } from "react"
import { MultipleRectSkeleton } from "../ui/skeletons"
import FavoriteMovies from "../ui/favoriteMovies"
import FormExample from "../ui/formExample"
import FavMovieFormExample from "../ui/favMovieFormExample"

export default async function Home() {

    return (
        <div className="w-full h-full grid grid-cols-2 gap-4">
            <FavMovieFormExample/>
            <Suspense fallback={<MultipleRectSkeleton/>}>
                <FavoriteMovies/>
            </Suspense>
            <FormExample/>
        </div>
    )
};