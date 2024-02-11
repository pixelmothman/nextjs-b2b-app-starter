import { Suspense } from "react"
import { MultipleRectSkeleton } from "../ui/skeletons"
import FavoritePersonalMovies from "../ui/favoritePersonalMovies"
import FormExampleSearchParams from "../ui/formExampleSearchParams"
import FavMovieFormExample from "../ui/favMovieFormExample"
import FavoriteOrgMovies from "../ui/favoriteOrgMovies"

export default async function Home() {

    return (
        <div className="w-full h-full grid grid-cols-2 gap-4">
            <FavMovieFormExample/>
            <Suspense fallback={<MultipleRectSkeleton/>}>
                <FavoritePersonalMovies/>
            </Suspense>
            <FormExampleSearchParams/>
            <Suspense fallback={<MultipleRectSkeleton/>}>
                <FavoriteOrgMovies/>
            </Suspense>
        </div>
    )
};