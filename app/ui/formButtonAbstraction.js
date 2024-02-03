'use client'

import { useFormStatus } from 'react-dom'

export default function FormButtonAbstraction({loadingText, buttonText}){
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="self-end w-fit px-4 py-2 border border-neutral-800 rounded-md shadow-sm text-sm font-bold text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100  focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-black">
        {
            pending ? loadingText : buttonText
        }
        </button>
    )
};