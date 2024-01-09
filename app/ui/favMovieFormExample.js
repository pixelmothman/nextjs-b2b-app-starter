'use client'

import { uploadFavMovie } from "../lib/actions"

export default function FavMovieFormExample(){

    return (
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
            <h2 className="text-2xl font-bold text-zinc-200">
            Write your favorite movie
            </h2>
            <p className="text-zinc-200 mb-4">
            After completing the form, your favorite movie should appear in the list.
            </p>
            <form action={uploadFavMovie} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="movie-example" className="font-bold text-sm text-zinc-200">
                    Movie
                    </label>
                    <input id="movie-example" name="movie-example" className="w-full h-10 px-4 py-2 rounded-md bg-zinc-600 text-zinc-200"/>
                </div>
                <button type="submit" className="self-end w-fit px-4 py-2 bg-blue-500 hover:bg-blue-700 text-zinc-100 font-bold rounded-md">Upload</button>
            </form>
        </div>
    )
};