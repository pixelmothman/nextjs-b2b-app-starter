"use client"

import {useRedirectFunctions} from "@propelauth/nextjs/client";

export default function SignupAndLoginButtons() {
	const {redirectToSignupPage, redirectToLoginPage} = useRedirectFunctions()
	return <div className="flex flex-row gap-4">
        <button onClick={() => redirectToLoginPage()} className="w-full relative flex items-center justify-center px-4 py-2 text-base font-semibold text-white bg-neutral-800 border border-neutral-800 rounded-lg hover:ring-2 hover:ring-blue-500">Log in</button>
		<button onClick={() => redirectToSignupPage()} className="w-full relative flex items-center justify-center px-4 py-2 text-base font-semibold text-black border border-neutral-800 rounded-lg hover:ring-2 hover:ring-blue-500">Sign up</button>
	</div>
}