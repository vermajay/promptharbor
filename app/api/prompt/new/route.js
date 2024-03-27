import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async(req) => {
    const {userId, prompt, tag} = await req.json();

    try{
        await connectToDB();  //we have to do this every time because this is a lambda function, meaning it's going to die once it does it's job, so every time, it connects to the database, do it's job and go in peace

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    }
    catch(error){
        return new Response("Failed to create a new prompt", {status: 500})
    }
}