"use client"

import {useRedirectFunctions} from "@propelauth/nextjs/client";

export default function SignupAndLoginButtons() {
	const {redirectToSignupPage, redirectToLoginPage} = useRedirectFunctions()
	return <div className="flex flex-row gap-4">
        <button onClick={() => redirectToLoginPage()} className="w-full h-12 bg-blue-400 hover:bg-blue-700 text-zinc-100 font-bold rounded-md">Log in</button>
		<button onClick={() => redirectToSignupPage()} className="w-full h-12 bg-pink-300 hover:bg-pink-700 text-zinc-100 font-bold rounded-md">Sign up</button>
	</div>
}