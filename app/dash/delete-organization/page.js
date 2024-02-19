import DeleteOrgExample from "@/app/ui/delete-org/deleteOrgBtn";

export default async function DeleteOrganization(){

    return (
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
            <div className="w-full h-full flex flex-col justify-between p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-zinc-200">
                    Delete Orgnaization
                    </h2>
                    <p className="text-zinc-200 mb-4">
                    The organization will be deleted by the end of the day.
                    </p>
                </div>
                <DeleteOrgExample />
            </div>
        </div>
    )
};