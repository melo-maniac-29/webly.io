"use client"; //client side rendering
import React from "react"; //for dark theme providing after installing npm dark theme mode do this
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { useState } from "react";
import { useContext } from "react";
import { User } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children }) {
    const[messages,setMessages] = useState();
    const[userDetail,setUserDetail] = useState();
  return (
    <div>
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}> 
      <MessagesContext.Provider value={{messages,setMessages}}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </NextThemesProvider>
      </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </div>
  );
}

export default Provider;
