'use client'

import { addOrgToDeleteQueue } from "@/lib/actions"

export default function DeleteOrgExample(){

    return (
        <div className="w-full h-full flex flex-col justify-between p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-zinc-200">
                Delete Orgnaization
                </h2>
                <p className="text-zinc-200 mb-4">
                The organization will be deleted by the end of the day.
                </p>
            </div>
            <form action={addOrgToDeleteQueue} className="flex flex-col gap-4">
                <button type="submit" className="self-end w-fit px-4 py-2 bg-red-500 hover:bg-red-700 text-zinc-100 font-bold rounded-md">Delete Organization</button>
            </form>
        </div>
    )
};