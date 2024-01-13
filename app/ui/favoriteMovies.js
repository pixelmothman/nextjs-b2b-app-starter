import { fetchFavoriteMovies } from "@/lib/data";

export default async function FavoriteMovies(){
    const favMovies = await fetchFavoriteMovies();

    return(
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
            <h2 className="text-2xl font-bold text-neutral-200">
            Favorite movies
            </h2>
            <p className="text-neutral-200 mb-4">
            Simulating fetching from a database.
            </p>
            <div className="flex flex-col gap-2">
            {
                favMovies !== null && favMovies.length !== 0 ? (
                    favMovies.map((movie, index) => {
                        return (
                            <div key={movie + index} className="w-full h-fit">
                                <span className="text-base font-semibold">
                                    {movie}
                                </span>
                            </div>
                        )
                    })
                ) : (
                    <div className="w-full h-fit">
                        <span className="text-base font-semibold text-neutral-200">
                            No movies yet.
                        </span>
                    </div>
                )
            }
            </div>
        </div>
    )
};