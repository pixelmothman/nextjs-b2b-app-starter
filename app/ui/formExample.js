'use client'

import { createExampleMessage } from "../lib/actions"

export default function FormExample(){

    return (
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
            <h2 className="text-2xl font-bold text-zinc-200">
            Get a message from the machine
            </h2>
            <p className="text-zinc-200 mb-4">
            After completing the form, you will be redirected to a page with a message from the machine.
            </p>
            <form action={createExampleMessage} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username-example" className="font-bold text-sm text-zinc-200">
                    Username
                    </label>
                    <input id="username-example" name="username-example" className="w-full h-10 px-4 py-2 rounded-md bg-zinc-600 text-zinc-200"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="age-example" className="font-bold text-sm text-zinc-200">
                    Age
                    </label>
                    <input id="age-example" name="age-example" className="w-full h-10 px-4 py-2 rounded-md bg-zinc-600 text-zinc-200"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="movie-genre-example" className="font-bold text-sm text-zinc-200">
                    Favorite movie genre
                    </label>
                    <select id="movie-genre-example" name="movie-genre-example" className="w-full h-10 px-4 py-2 rounded-md bg-zinc-600 text-zinc-200">
                        <option value="horror">
                            Horror
                        </option>
                        <option value="sci-fi">
                            Science Fiction
                        </option>
                        <option value="romantic comedies">
                            Romantic Comedies
                        </option>
                        <option value="action">
                            Action
                        </option>
                    </select> 
                </div>
                <button type="submit" className="self-end w-fit px-4 py-2 bg-blue-500 hover:bg-blue-700 text-zinc-100 font-bold rounded-md">Get the message</button>
            </form>
        </div>
    )
};