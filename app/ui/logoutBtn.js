'use client'

import { useLogoutFunction } from "@propelauth/nextjs/client"

export default function LogoutButton() {
	const logoutFn = useLogoutFunction()
	return <button onClick={logoutFn} className="w-fit h-fit px-4 py-2 flex flex-row  gap-2 items-center justify-center bg-blue-500 hover:bg-blue-700 text-sm text-zinc-100 font-bold rounded-md">
		<svg className="fill-zinc-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M116,216a12,12,0,0,1-12,12H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28h56a12,12,0,0,1,0,24H52V204h52A12,12,0,0,1,116,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L187,116H104a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,224.49,119.51Z"></path></svg>
		Logout
		</button>
}