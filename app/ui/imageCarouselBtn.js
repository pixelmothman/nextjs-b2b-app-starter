'use client'

import { useFormStatus } from 'react-dom'

export default function ImageCarouselBtn(){
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="flex items-center justify-center w-fit px-2 py-1 bg-neutral-800 font-bold text-neutral-100 border border-neutral-500 rounded-md hover:bg-neutral-100 hover:text-neutral-800">
        {
            pending ? 'Loading...' : 'Load More'
        }
        </button>
    )
};
