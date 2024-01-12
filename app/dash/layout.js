import { getUserOrRedirect } from "@propelauth/nextjs/server/app-router";
import LogoutButton from "../ui/logoutBtn";
import AccountAndOrgButtons from "../ui/accountBtns";
import Link from "next/link";

export default async function DashLayout( { children }) {
    const user = await getUserOrRedirect()

    return (
        <div className="w-full h-full p-4 bg-neutral-100 overflow-hidden">
            <div className="w-full h-full flex flex-col max-w-5xl gap-6 mx-auto">
                <div className="w-full h-fit flex flex-row justify-between items-center">
                    <Link href="/dash" className="font-black text-xl text-neutral-900">
                        NextJS Starter
                    </Link>
                    <div className="w-fit h-fit flex flex-row gap-4">
                        <AccountAndOrgButtons/>
                        <LogoutButton/>
                    </div>
                </div>
                <>
                { children }
                </>
            </div>
        </div>
    )
};