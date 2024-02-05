import { Suspense } from "react"
import { MultipleRectSkeleton } from "../ui/skeletons"
import FavoritePersonalMovies from "../ui/favoritePersonalMovies"
import FormExample from "../ui/formExample"
import FavMovieFormExample from "../ui/favMovieFormExample"
import FavoriteOrgMovies from "../ui/favoriteOrgMovies"

export default async function Home() {

    return (
        <div className="w-full h-full grid grid-cols-2 gap-4">
            <FavMovieFormExample/>
            <Suspense fallback={<MultipleRectSkeleton/>}>
                <FavoritePersonalMovies/>
            </Suspense>
            <FormExample/>
            <Suspense fallback={<MultipleRectSkeleton/>}>
                <FavoriteOrgMovies/>
            </Suspense>
        </div>
    )
};