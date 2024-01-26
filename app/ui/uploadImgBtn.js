'use client'

import { useFormStatus } from 'react-dom'

export default function UploadImgBtn(){
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={`self-end w-fit px-4 py-2 border border-neutral-800 rounded-md shadow-sm text-sm font-bold text-neutral-800 hover:bg-neutral-800 hover:text-neutral-100 ${
            pending ? 'opacity-75 cursor-not-allowed animate-pulse' : ''
          }`}>
            Upload {pending && '...'}
        </button>
    )
}