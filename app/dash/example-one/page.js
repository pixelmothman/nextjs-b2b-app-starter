'use client'

import StyledDropzone from "@/app/ui/uploadImageForm";
import StyledDropzoneMultipleImages from "@/app/ui/uploadImagesForm";

export default function FavMovieFormExample(){

    return (
        <div className="w-full h-full flex flex-row gap-4">
            <StyledDropzone/>
            <StyledDropzoneMultipleImages/>
        </div>
    )
};