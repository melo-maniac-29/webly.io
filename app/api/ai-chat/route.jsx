import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

//api endpoint to send the prompt to the AI model

export async function POST(req){
    const{prompt}=await req.json();

    try{
        const result=await chatSession.sendMessage(prompt);
        const AIResp=result.respone.text();

        return NextResponse.json({result:AIResp})
    }catch(e){
        return NextResponse.json({error:e})
    }

}