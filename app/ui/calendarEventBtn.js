'use client'

import { useFormStatus } from 'react-dom'

export default function CalendarEventBtn(){
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="w-fit self-end px-4 py-2 bg-white border border-neutral-800 rounded-md shadow-sm text-sm font-bold text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-black">
        {
            pending ? 'Loading...' : 'Add event'
        }
        </button>
    )
};