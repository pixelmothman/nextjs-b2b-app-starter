'use server'

import { z } from 'zod';
import {getUser} from "@propelauth/nextjs/server/app-router";
import { processData, uploadFavoriteMovie } from './data';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


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

    revalidatePath('/menu');
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
    let newURL = `/menu/message-received?message=${messageReceived}`;
    
    redirect(newURL);
};