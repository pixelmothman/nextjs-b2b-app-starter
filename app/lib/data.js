'use server'

import { unstable_noStore as noStore } from "next/cache";
import {getUser} from "@propelauth/nextjs/server/app-router";

//here we would fetch data from the db
//import { getSupabaseClient } from "./supabase";

export async function fetchFavoriteMovies(){
    //prevents the response from being cached
    noStore();
    try {

        //check the user exists
        const user = await getUser();

        if (!user) {
            throw new Error('User not found')
        }

        //get the supabase client
        //const supabase = await getSupabaseClient();

        //example
        let movieArray = [
            "Halloween",
            "Scream",
            "Night of the living dead",
        ]
        

        return movieArray;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch favorite movies')
    };
};

export async function processData(username, age, favoriteMovieGenre){
    //prevents the response from being cached
    noStore();
    try {

        //check the user exists
        const user = await getUser();

        if (!user) {
            throw new Error('User not found')
        }

        //get the supabase client
        //const supabase = await getSupabaseClient();

        //example (returning something random)
        let message = `${username}_${age}_${favoriteMovieGenre}`;
        
        return message;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch upload data')
    };
};