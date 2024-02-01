'use server'

import { unstable_noStore as noStore } from "next/cache";
import {getUser} from "@propelauth/nextjs/server/app-router";
import { getSupabaseClient } from "./supabase";
import { v4 as uuidv4 } from 'uuid';

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

export async function getSignedUploadURL(orgID, imageType){
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

        //get the signed url
        //use the uuid to make the image name unique
        let imageName = uuidv4();
        const { data: theSignedUploadURL, error } = await supabase.storage.from('images').createSignedUploadUrl(`${orgID}/${imageName}.${imageType}`);
        
        //return the signed url
        let signedUploadURL = {
            p: theSignedUploadURL.path,
            t: theSignedUploadURL.token
        }

        return signedUploadURL;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch upload data')
    };
}

export async function fetchImgsFromOrg(){
    //prevents the response from being cached
    noStore();
    try {

        //check the user exists
        const user = await getUser();

        if (!user) {
            throw new Error('User not found')
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

        if(listOfImgs.length === 0){
            let imagesData = {
                counterOfFiles: 0,
                listSignedURLS: []
            }

            return imagesData
        } else {
            let counterOfFiles = listOfImgs.length;
            let arrayOfPaths = [];
            for (let i = 0; i < 4; i++) {
                arrayOfPaths.push(`${orgID}/${listOfImgs[i].name}`);
            }

            //get the singned urls of images from the org from the database
            const { data: listOfSignedURLS, error: listOfSignedURLSError} = await supabase
            .storage
            .from('images')
            .createSignedUrls( arrayOfPaths , 300)

            //filter to get only an array og the signedUrl keys
            let listSignedURLS = [];
            for (let i = 0; i < listOfSignedURLS.length; i++) {
                listSignedURLS.push(listOfSignedURLS[i].signedUrl);
            }

            let imagesData = {
                counterOfFiles,
                listSignedURLS
            }

            return imagesData;
        }
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch favorite movies')
    };
};

export async function getSignedURLsFromSupa(orgID, offSetNumber){
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

        //list all files in the images bucket related to the org
        const { data: listOfImgs, error: listOfImgsError } = await supabase
            .storage
            .from('images')
            .list(`${orgID}`, {
            limit: 4,
            offset: offSetNumber,
            sortBy: { column: 'name', order: 'asc' },
        })

        let arrayOfPaths = [];
        for (let i = 0; i < listOfImgs.length; i++) {
            arrayOfPaths.push(`${orgID}/${listOfImgs[i].name}`);
        }

        //get the singned urls of images from the org from the database
        const { data: listOfSignedURLS, error: listOfSignedURLSError} = await supabase
        .storage
        .from('images')
        .createSignedUrls( arrayOfPaths , 300)

        //filter to get only an array og the signedUrl keys
        let listSignedURLS = [];
        for (let i = 0; i < listOfSignedURLS.length; i++) {
            listSignedURLS.push(listOfSignedURLS[i].signedUrl);
        }


        return listSignedURLS;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch favorite movies')
    };
};

export async function fetchCalendarEvents(date){
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

        //get the first day of the month and delete eveything after T00:00:00.000Z
        let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        startDate = startDate.toISOString().split('T')[0];


        //get the first day of the next month
        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        endDate = endDate.toISOString().split('T')[0];

        //get the calendar events from the database
        const { data: calEvents, error: calEventsError } = await supabase
        .from("calendar_events_table")
        .select("*")
        .eq("org_id", orgID)
        .gte('cal_event_start_date', startDate)
        .lt('cal_event_start_date', endDate)

        //create an array with the calendar events
        let calEventsArray = [];
        for (let i = 0; i < calEvents.length; i++) {
            calEventsArray.push(calEvents[i]);
        };
        
        return calEventsArray;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch calendar events')
    };
};

export async function uploadCalEvent(calEventLabel, calEventName, calEventDescription, calEventStartDate, calEventEndDate){
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

        //upload the calendar event to the database
        const { error: calUploadEventError } = await supabase.from("calendar_events_table").insert({
            org_id: orgID,
            user_id: user.userId,
            cal_event_label: calEventLabel,
            cal_event_name: calEventName,
            cal_event_description: calEventDescription,
            cal_event_start_date: calEventStartDate,
            cal_event_end_date: calEventEndDate,
        });

        return;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch favorite movies')
    };
};

export async function updateCalEvent(
    calendarEventID,
    calendarEventLabel,
    calendarEventName,
    calendarEventDescription,
    calendarEventStartDate,
    calendarEventEndDate
){
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

        //delete the calendar event from the database with id calendarEventID
        const { error: calDeleteEventError } = await supabase.from("calendar_events_table").delete().eq("cal_event_id", calendarEventID).eq("org_id", orgID);

        //upload the calendar event to the database
        const { error: calUploadEventError } = await supabase.from("calendar_events_table").insert({
            org_id: orgID,
            user_id: user.userId,
            cal_event_label: calendarEventLabel,
            cal_event_name: calendarEventName,
            cal_event_description: calendarEventDescription,
            cal_event_start_date: calendarEventStartDate,
            cal_event_end_date: calendarEventEndDate,
        });

        return;
    } catch (error) {
        console.error('DB Error: ', error);
        throw new Error('Failed to fetch favorite movies')
    };
};