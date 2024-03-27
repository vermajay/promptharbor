import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
export const GET = async(req, {params}) => {
    try{
        await connectToDB();  //we have to do this every time because this is a lambda function, meaning it's going to die once it does it's job, so every time, it connects to the database, do it's job and go in peace

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(prompt), {status: 200})
    }
    catch(error){
        return new Response(`Failed to fetch prompt with id: ${params.id}`, {status: 500})
    }
}

//PATCH (update)
export const PATCH = async(req, {params}) => {
    const {prompt, tag} = await req.json();

    try{
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status: 404})
 
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200})
    }
    catch(error){
        return new Response(`Failed to update prompt with id: ${params.id}`, {status: 500})
    }
}

//DELETE (delete)
export const DELETE = async(req, {params}) => {
    try{
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", {status: 200})
    }
    catch(error){
        return new Response(`Failed to delete prompt with id: ${params.id}`, {status: 500})
    }
}