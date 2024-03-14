import CancelDeleteOrgBtn from "@/app/ui/delete-org/cancelDeleteOrgBtn";
import DeleteOrgExample from "@/app/ui/delete-org/deleteOrgBtn";
import { getIsOrgInDeleteQueue } from "@/lib/data";

export default async function DeleteOrganization(){
    const isOrgInDeleteQueue = await getIsOrgInDeleteQueue();

    return (
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
            <div className="w-full h-full flex flex-col justify-between p-5 rounded-sm bg-neutral-800 shadow-sm overflow-y-auto">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-neutral-200">
                    Delete Organization
                    </h2>
                    {
                        isOrgInDeleteQueue.isOrgInDeleteQueue === false ? (
                            <p className="text-neutral-200 mb-4">
                            If you click the delete org button, the organization will be deleted tonight at midnight.
                            </p>
                        ) : (
                            <p className="text-neutral-200 mb-4">
                            The organization will be deleted tonight at midnight.
                            </p>
                        )
                    }
                </div>
                {
                    isOrgInDeleteQueue.isOrgInDeleteQueue === false ? (
                        <DeleteOrgExample/>
                    ) : (
                        <CancelDeleteOrgBtn/>
                    )
                }

            </div>
        </div>
    )
};