import { Webhook } from "svix";
import { buffer } from "@/app/lib/buffer";
import { propelauth } from "@/app/lib/propelauth";
import { getSupabaseClient } from "@/app/lib/supabase";

const secret = process.env.SVIX_WEBHOOK_DEL_USER;

export async function POST(req, res) {

    console.log("Webhook received! Verifying...");

    const payload = (await buffer(req)).toString();
    const headers = req.headers;

    const wh = new Webhook(secret);
    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    console.log("Webhook verified! Starting to process...");

    //extract useful information from the webhook
    const { org_id, removed_user_id } = msg;

    //delete the user from PropelAuth
    propelauth.deleteUser(removed_user_id);

    //get the supabase client
    const supabase = await getSupabaseClient();

    //delete from the database
    const { error } = await supabase.from("user_table").delete().eq("user_id", removed_user_id);

    //check for errors
    if(error){
        console.log("Error inserting data into the database: ", error);
        res.status(500).json({
            error: "Error inserting data into the database"
        });
    }

    res.json({message: "Webhook processed successfully!"});
};