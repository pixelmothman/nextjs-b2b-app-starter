'use client'

import { uploadFavMovie } from "@/lib/actions"

export default function FavMovieFormExample(){

    return (
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-white border border-neutral-800 shadow-sm overflow-y-auto">
            <h2 className="text-2xl font-bold text-neutral-800">
            Upload your favorite movie
            </h2>
            <p className="text-neutral-800 mb-4">
            After completing the form, your favorite movie should appear in the list.
            </p>
            <form action={uploadFavMovie} className="h-full flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-2">
                    <label htmlFor="movie-example" className="font-bold text-sm text-neutral-800">
                    Movie
                    </label>
                    <input autoComplete="off" type="text" id="movie-example" name="movie-example" className="w-full h-8 px-2 border border-neutral-800 rounded-md shadow-sm text-sm font-normal text-neutral-800 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-black"/>
                </div>
                <button type="submit" className="self-end w-fit px-4 py-2 border border-neutral-800 rounded-md shadow-sm text-sm font-bold text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100">Upload</button>
            </form>
        </div>
    )
};