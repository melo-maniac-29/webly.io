"use client" //client side rendering
import Lookup from "../../data/lookup";
import React from "react";
import { ArrowRight } from "lucide-react";
import {Link} from "lucide-react";
import { useState } from "react";

function Hero() {
  const[userInput, setUserInput] = useState();
  return (
    <div className="flex flex-col items-center mt-36 xl:52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-2xl w-full mt-3">
        <div className="flex gap-2">
          <textarea placeholder={Lookup.INPUT_PLACEHOLDER} 
          onChange={(event)=>setUserInput(event.target.value)}
          className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"/>
          {userInput && <ArrowRight className="bg-blue-500 p-2 h-9 w-9 rounded-md cursor-pointer" />}
        </div>
        <div className="h-5 w-5">
          <Link/>
        </div>
      </div>
    </div>
  );
}

export default Hero;
