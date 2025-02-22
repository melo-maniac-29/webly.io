"use client" //client side rendering
import Lookup from "../../data/lookup";
import React from "react";
import { ArrowRight } from "lucide-react";
import {Link} from "lucide-react";
import { useState } from "react";
import Colors from "../../data/Colors";
import { useContext } from "react";
import { MessagesContext } from "../../context/MessagesContext";

function Hero() {
  const[userInput, setUserInput] = useState();

  const {messages,setMessages} = useContext(MessagesContext);

  const onGenerate = (input) => { 
    setMessages({
      role:'user',
      content:input
    })
  }

  return (
    <div className="flex flex-col items-center mt-36 xl:52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3"
      style={
        {
          backgroundColor:Colors.BACKGROUND
        }
      }
      >
        <div className="flex gap-2">
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
          onChange={(event)=>setUserInput(event.target.value)}
          className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"/>
          {userInput && <ArrowRight 
          onClick={()=>onGenerate(userInput)}
          className="bg-blue-500 p-2 h-9 w-9 rounded-md cursor-pointer" />}
        </div>
        <div className="h-5 w-5">
          <Link/>
        </div>
      </div>
      <div className=" mt-8 flex flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2 key={index}
          onClick={()=>setUserInput(suggestion)}
          className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
          >{suggestion}</h2>
        ))}
      </div>
    </div>
  );
}

export default Hero;
