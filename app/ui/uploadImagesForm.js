'use client'

import { getUploadURLS } from '@/lib/actions';
import React, {useEffect, useState, useMemo} from 'react';
import { useFormState } from 'react-dom'
import {useDropzone} from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';
import UploadImgBtn from './uploadImgBtn';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#262626',
    borderStyle: 'solid',
    backgroundColor: '#f5f5f5',
    color: '#525252',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2563eb'
  };
  
  const acceptStyle = {
    borderColor: '#22c55e'
  };
  
  const rejectStyle = {
    borderColor: '#ef4444'
  };

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON
);


export default function StyledDropzone(props) {
  //for the form
  const [ formState, formAction ] = useFormState(getUploadURLS, null)
  //for the image
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    maxFiles: 2,
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);


  //to manage the response from the server
  useEffect(() => {
    if (formState !== null && formState?.success !== false) {
      const uploadImages = async () => {
        await Promise.all([
          uploadImage(formState?.signedUploadURLOne.p, formState?.signedUploadURLOne.t, files[0]),
          uploadImage(formState?.signedUploadURLTwo.p, formState?.signedUploadURLTwo.t, files[1])
        ]);
      };
      uploadImages();
    }
  }, [formState]);
  

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const uploadImage = async (p, t, fileToUpload) => {
    const { data, error } = await supabase.storage.from('images').uploadToSignedUrl(p, t, fileToUpload)
    if (error) {
      throw error
    }
    if (data) {
      alert('Image uploaded successfully!')
    }
  };


  return (
    <div className="w-full h-full flex flex-col p-5 rounded-sm bg-white border border-neutral-800 shadow-sm overflow-y-auto">
        <div className='w-full h-fit flex flex-col gap-2'>
          <h2 className="text-2xl font-bold text-neutral-800">
          Upload multiple images
          </h2>
          <p className="text-neutral-800 mb-4">
          Upload up to 2 images.
          </p>
        </div>
        <div {...getRootProps({className: 'dropzone', style})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image, or click to select images</p>
        </div>
        <aside style={thumbsContainer}>
            {thumbs}
        </aside>
        <form action={formAction} className="h-full flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-2">
              <input autoComplete="off" type="hidden" value={
                files[0]?.path.split('.').pop()
              } id="image-type-one" name="image-type-one" className="form-input w-full h-10 px-4 py-2 rounded-md bg-neutral-100 text-neutral-800 outline-0 ring-0 border-0 focus-visible:ring-black"/>
              <input autoComplete="off" type="hidden" value={
                files[1]?.path.split('.').pop()
              } id="image-type-two" name="image-type-two" className="form-input w-full h-10 px-4 py-2 rounded-md bg-neutral-100 text-neutral-800 outline-0 ring-0 border-0 focus-visible:ring-black"/>
          </div>
          <UploadImgBtn />
        </form>
        {
          formState?.success === false && (
            <p className="text-red-500 text-sm">
              {formState?.message}
            </p>
          )
        }
    </div>
  );
}