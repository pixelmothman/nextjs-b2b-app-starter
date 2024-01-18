import { fetchImgsFromOrg } from "@/lib/data";
import ImageCarousel from "./imageCarousel";

export default async function ImageGallery(){

    const imagesList = await fetchImgsFromOrg();

    return(
        <div className="w-full h-full flex flex-col p-5 rounded-sm bg-white border border-neutral-800 shadow-sm overflow-y-auto">
            <h2 className="text-2xl font-bold text-neutral-800">
            Image Gallery
            </h2>
            <p className="text-neutral-800 mb-4">
            Fetching the images that users from the organization have uploaded.
            </p>
            <ImageCarousel imageList={imagesList}/>
        </div>
    )
};