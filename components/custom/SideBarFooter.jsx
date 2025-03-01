import { HelpCircle } from "lucide-react";
import { LogOut } from "lucide-react";
import { Wallet } from "lucide-react";
import { Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function SideBarFooter() {

  const router=useRouter();

  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help-Center",
      icon: HelpCircle,
    },
    {
      name: "My-subscription",
      icon: Wallet,
      path:'/pricing'
    },
    {
      name: "Sign-Out",
      icon: LogOut,
    },
  ];

  const onOptionClick=(option)=>{
    router.push(option.path);
  }

  return (
    <div className="p-2 mb-10 ">
      {options.map((option, index) => (
        <Button 
        onClick={()=>onOptionClick(option)}
        className="w-full flex justify-start my-3" variant="ghost" key={index}>
            <option.icon />
            {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
