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
                    <input autoComplete="off" type="text" id="movie-example" name="movie-example" className="form-input w-full h-10 px-4 py-2 rounded-md bg-neutral-100 text-neutral-800 outline-0 ring-0 border-0 focus-visible:ring-black"/>
                </div>
                <button type="submit" className="self-end w-fit px-4 py-2 bg-blue-500 hover:bg-blue-700 text-zinc-100 font-bold rounded-md">Upload</button>
            </form>
        </div>
    )
};