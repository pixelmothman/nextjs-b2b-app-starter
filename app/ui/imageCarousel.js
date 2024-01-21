'use client'

import { useEffect, useState } from "react";
import ImageCarouselForm from "./imageCarouselForm";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';


export default function ImageCarousel({imagesList}){

    const [images, setImages] = useState([]);
    const [offset, setOffset] = useState(4);

    useEffect(() => {
        if(imagesList?.counterOfFiles > 0){
            setImages(imagesList.listSignedURLS);
        };
    }
    , []);

    const handleOffsetChange = (newOffset) => {
        setOffset(newOffset);
    };

    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };

    return (
        <>
            {
                images && images
                .length > 0 ? (
                    <>
                        <div className="w-full flex flex-row items-center justify-between pb-4">
                            <span className="text-neutral-800 font-semibold">
                            {`Images: ${imagesList?.counterOfFiles}`}
                            </span>
                            <ImageCarouselForm imageListCounter={imagesList.counterOfFiles} offset={offset} onOffsetChange={handleOffsetChange} images={images} onImagesChange={handleImagesChange}/>
                        </div>
                        <div className="grid grid-cols-4 gap-4 overflow-y-auto">
                        {
                            images.map((image, index) => {
                                return (
                                    <AspectRatio.Root ratio={1} key={index}>
                                        <img src={image} className="rounded-sm"/>
                                    </AspectRatio.Root>
                                )
                            })
                        }
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 rounded-md">
                        <span className="font-black text-base text-white">
                            No images to show.
                        </span>
                    </div>
                )
            }
        </>
        
    )
};