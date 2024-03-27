import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req) => {
    try{
        await connectToDB();  //we have to do this every time because this is a lambda function, meaning it's going to die once it does it's job, so every time, it connects to the database, do it's job and go in peace

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})
    }
    catch(error){
        return new Response("Failed to fetch all prompts", {status: 500})
    }
}