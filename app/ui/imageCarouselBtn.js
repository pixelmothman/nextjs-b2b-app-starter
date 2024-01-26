'use client'

import { useFormStatus } from 'react-dom'

export default function ImageCarouselBtn(){
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="w-fit px-4 py-2 border border-neutral-800 rounded-md shadow-sm text-sm font-bold text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100">
        {
            pending ? 'Loading...' : 'Load More'
        }
        </button>
    )
};
