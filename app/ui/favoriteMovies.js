import { fetchFavoriteMovies } from "@/lib/data";

export default async function FavoriteMovies(){
    const favMovies = await fetchFavoriteMovies();

    return(
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-white border border-neutral-800 shadow-sm overflow-y-auto">
            <h2 className="text-2xl font-bold text-neutral-800">
            Favorite movies
            </h2>
            <p className="text-neutral-800 mb-4">
            Simulating fetching from a database.
            </p>
            <div className="flex flex-row gap-4 flex-wrap">
            {
                favMovies !== null && favMovies.length !== 0 ? (
                    favMovies.map((movie, index) => {
                        return (
                            <div key={movie + index} className="w-fit h-fit px-4 py-2 bg-neutral-100 rounded-md shadow-sm border border-neutral-800 cursor-default hover:outline hover:outline-neutral-300">
                                <span className="text-sm font-semibold text-neutral-800">
                                    {movie}
                                </span>
                            </div>
                        )
                    })
                ) : (
                    <div className="w-full h-fit">
                        <span className="text-base font-semibold text-neutral-800">
                            No movies yet.
                        </span>
                    </div>
                )
            }
            </div>
        </div>
    )
};