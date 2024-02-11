import { Suspense } from "react"
import { MultipleRectSkeleton } from "../ui/loading/skeletons"
import FavoritePersonalMovies from "../ui/favorite-movies/favoritePersonalMovies"
import FormExampleSearchParams from "../ui/create-message-form/formExampleSearchParams"
import FavMovieFormExample from "../ui/favorite-movies/favMovieFormExample"
import FavoriteOrgMovies from "../ui/favorite-movies/favoriteOrgMovies"

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