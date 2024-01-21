'use server'

import { z } from 'zod';
import {getUser} from "@propelauth/nextjs/server/app-router";
import { addOrgToDBDeleteQueue, getSignedUploadURL, getSignedURLsFromSupa, processData, uploadFavoriteMovie } from './data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSupabaseClient } from "./supabase";


const FavMovieDataSchema = z.object({
    movie: z.string(),
});

export async function uploadFavMovie(formData){

    //check the user exists
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    };

    //get the data from the form
    //inside the get() write the id of the corresponding html form element
    const { movie } = FavMovieDataSchema.parse({
        movie: formData.get('movie-example'),
    });

    //call a function to process the data
    await uploadFavoriteMovie(movie);

    revalidatePath('/dash');
};

const ExampleDataSchema = z.object({
    username: z.string(),
    age: z.coerce.number(),
    favoriteMovieGenre: z.enum(['horror','sci-fi','romantic comedies', 'action']),
});

export async function createExampleMessage(formData){

    //check the user exists
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    };

    //get the data from the form
    //inside the get() write the id of the corresponding html form element
    const { username, age, favoriteMovieGenre } = ExampleDataSchema.parse({
        username: formData.get('username-example'),
        age: formData.get('age-example'),
        favoriteMovieGenre: formData.get('movie-genre-example'),
    });

    //call a function to process the data
    let messageReceived = await processData(username, age, favoriteMovieGenre);

    //in this case we will return the message received
    let newURL = `/dash/message-received?message=${messageReceived}`;
    
    redirect(newURL);
};

export async function addOrgToDeleteQueue(){

    //check the user exists
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    };

    //get the org_id 
    let org = user.orgIdToOrgMemberInfo;

    let orgID = Object.keys(org)[0];

    //check the role of the user is equal to Owner
    let isOwnerRole = user.orgIdToOrgMemberInfo[orgID].isRole("Owner");

    if(!isOwnerRole){
        throw new Error('User is not an Owner');
    }

    //add the org to the delete queue
    await addOrgToDBDeleteQueue(orgID);

    //redirect to menu
    let newURL = `/dash`;
    
    redirect(newURL);
};


const SingedUploadURLSchema = z.object({
    imageType: z.enum(['png','jpg','jpeg']),
});

export async function getUploadURL(prevState, formData){
    //check the user exists
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    };

    //get the data from the form
    //inside the get() write the id of the corresponding html form element
    const { imageType } = SingedUploadURLSchema.parse({
        imageType: formData.get('image-type'),
    });

    //console.log(imageType);

    //get the org_id 
    let org = user.orgIdToOrgMemberInfo;

    let orgID = Object.keys(org)[0];

    //get signed url
    let signedUploadURL = await getSignedUploadURL(orgID, imageType);

    if (!signedUploadURL) {
        return {
            success: false,
            message: 'Failed to get signed upload URL'
        }
    }
    
    return signedUploadURL;
};

const SingedUploadURLsSchema = z.object({
    imageTypeOne: z.enum(['png','jpg','jpeg']),
    imageTypeTwo: z.enum(['png','jpg','jpeg']),
});

export async function getUploadURLS(prevState, formData){
    //check the user exists
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    };

    //get the data from the form
    //inside the get() write the id of the corresponding html form element
    const { imageTypeOne, imageTypeTwo } = SingedUploadURLsSchema.parse({
        imageTypeOne: formData.get('image-type-one'),
        imageTypeTwo: formData.get('image-type-two'),
    });

    //console.log(imageType);

    //get the org_id 
    let org = user.orgIdToOrgMemberInfo;

    let orgID = Object.keys(org)[0];

    //get signed url
    let signedUploadURLOne = await getSignedUploadURL(orgID, imageTypeOne);
    let signedUploadURLTwo = await getSignedUploadURL(orgID, imageTypeTwo);

    if (!signedUploadURLOne || !signedUploadURLTwo) {
        return {
            success: false,
            message: 'Failed to get signed upload URL'
        }
    }

    return {
        success: true,
        signedUploadURLOne,
        signedUploadURLTwo,
    }
};

const offsetSchema = z.object({
    offSetNumber: z.string(),
});

export async function getSingedURLS(prevState, formData){
    //check the user exists
    const user = await getUser();

    if (!user) {
        throw new Error('User not found');
    };

    //get the data from the form
    //inside the get() write the id of the corresponding html form element
    const { offSetNumber } = offsetSchema.parse({
        offSetNumber: formData.get('off-img-number'),
    });

    if(Number(offSetNumber) === NaN || Number(offSetNumber) === undefined || Number(offSetNumber) === null){
        throw new Error('Not a number');
    }

    //get the org_id 
    let org = user.orgIdToOrgMemberInfo;

    let orgID = Object.keys(org)[0];

    //get the supabase client
    const supabase = await getSupabaseClient();

    //list all files in the images bucket related to the org
    const { data: listOfImgs, error: listOfImgsError } = await supabase
    .storage
    .from('images')
    .list(`${orgID}`, {
    offset: 0,
    })

    if (listOfImgsError) {
        throw new Error('Failed to get list of images');
    }

    if(offSetNumber > listOfImgs.length){
        throw new Error('Offset number is greater than the number of images');
    }

    //get signed urls
    let signedURLS = await getSignedURLsFromSupa(orgID, offSetNumber);


    if (!signedURLS) {
        return {
            success: false,
            message: 'Failed to get signed URLs'
        }
    }

    return {
        success: true,
        signedURLS,
    }
};