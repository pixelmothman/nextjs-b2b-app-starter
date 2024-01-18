'use client'


export default function ImageCarousel({imageList}){
    return (
        <div className="w-full h-full">
            {
                imageList && imageList.length > 0 ? (
                    <>
                    <div className="w-full h-full grid grid-cols-4 gap-4">
                    {
                        imageList.map((image, index) => {
                            return (
                                <div key={index} className="w-full h-full flex flex-col items-center justify-center">
                                    <img src={image} className="w-full h-full object-cover rounded-sm"/>
                                </div>
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
        </div>
        
    )
};