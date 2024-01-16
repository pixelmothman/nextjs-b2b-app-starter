'use client'

import { useFormStatus } from 'react-dom'

export default function UploadImgBtn(){
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} className={`self-end w-fit px-4 py-2 bg-blue-500 hover:bg-blue-700 text-zinc-100 font-bold rounded-md ${
            pending ? 'opacity-75 cursor-not-allowed animate-pulse' : ''
          }`}>
            Upload {pending && '...'}
        </button>
    )
}