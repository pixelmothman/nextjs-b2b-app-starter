'use server'

import { unstable_noStore as noStore } from "next/cache";
import {getUser} from "@propelauth/nextjs/server/app-router";
import { getSupabaseClient } from "./supabase";

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
        const supabase = await getSupabaseClient();

        //get the favorite movies from the database
        const { data: data1, error } = await supabase.from("fav_movies_table").select('movie_name').eq("user_id", user.userId);
        
        //create an array with the favorite movies
        let movieArray = [];
        for (let i = 0; i < data1.length; i++) {
            movieArray.push(data1[i].movie_name);
        }

        return movieArray;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch favorite movies')
    };
};

export async function uploadFavoriteMovie(movieName){
    //prevents the response from being cached
    noStore();
    try {

        //check the user exists
        const user = await getUser();

        if (!user) {
            throw new Error('User not found')
        }

         //get the supabase client
         const supabase = await getSupabaseClient();

        //get the org_id 
        let org = user.orgIdToOrgMemberInfo;

        let orgID = Object.keys(org)[0];

         //insert the movie name into the database
         const { error } = await supabase.from("fav_movies_table").insert({org_id: orgID,user_id: user.userId ,movie_name: movieName})
        
        return;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch upload data')
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

        //example (returning something random)
        let message = `${username}_${age}_${favoriteMovieGenre}`;
        
        return message;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch upload data')
    };
};

export async function addOrgToDBDeleteQueue(orgID){
    //prevents the response from being cached
    noStore();
    try {

        //check the user exists
        const user = await getUser();

        if (!user) {
            throw new Error('User not found')
        };

        //get the supabase client
        const supabase = await getSupabaseClient();

        //add the org to the delete queue
        const { error } = await supabase.from("org_to_delete_table").insert({org_id: orgID, user_id: user.userId});
        
        return;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch upload data')
    };
};