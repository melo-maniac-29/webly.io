"use client"; //client side rendering

import Lookup from "@/data/Lookup";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "lucide-react";
import { useState } from "react";
import Colors from "../../data/Colors";
import { useContext } from "react";
import { MessagesContext } from "../../context/MessagesContext";
import { UserDetailContext } from "../../context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


function Hero() {
  const [userInput, setUserInput] = useState();

  const { messages, setMessages } = useContext(MessagesContext);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [openDialog, setOpenDialog] = useState(false);

  const CreateWorkspace=useMutation(api.workspace.CreateWorkspace);

  const router = useRouter(); //router object

  const onGenerate = async(input) => { //onGenerate function
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token<10){
      toast('You do not have enough tokens to generate response')
      return ;
    }

    const msg={ //creating message object
      role:'user',
      content:input
    }

    setMessages(msg);

    const workspaceId=await CreateWorkspace({ //creating workspace in database
      user:userDetail._id,
      messages:[msg]
    });

    console.log(workspaceId);

    router.push(`/workspace/`+workspaceId); //redirecting to workspace page

  };

  return (
    <div className="flex flex-col items-center mt-36 xl:52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-9 w-9 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div className="h-5 w-5">
          <Link />
        </div>
      </div>

      <div className=" mt-8 flex flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            key={index}
            onClick={() => setUserInput(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
          >{suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} 
      closeDialog={(v)=>setOpenDialog(v)} />  
    </div>
  );
}

export default Hero;
