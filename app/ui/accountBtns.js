"use client"

import {useRedirectFunctions} from "@propelauth/nextjs/client";

export default function AccountAndOrgButtons() {
	const {redirectToAccountPage, redirectToOrgPage} = useRedirectFunctions()
	return (
		<div className="w-full flex flex-row gap-4">
			<button onClick={() => redirectToAccountPage()} className="w-fit h-fit px-4 py-2 flex flex-row  gap-2 items-center justify-center bg-blue-500 hover:bg-blue-700 text-sm text-zinc-100 font-bold rounded-md">Account Settings</button>
			<button onClick={() => redirectToOrgPage()} className="w-fit h-fit px-4 py-2 flex flex-row  gap-2 items-center justify-center bg-blue-500 hover:bg-blue-700 text-sm text-zinc-100 font-bold rounded-md">Org Settings</button>
		</div>
	)
}