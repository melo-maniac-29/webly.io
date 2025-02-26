import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";

function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <Image src={"/logo.png"} alt="logo" width={30} height={30} />
      </SidebarHeader>
      <SidebarContent className="p-5">
        <Button><MessageCircleCode />Start New Chat</Button>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSideBar;
