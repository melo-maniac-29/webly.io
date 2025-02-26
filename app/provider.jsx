"use client"; //client side rendering
import React, { use, useState } from "react"; //for dark theme providing after installing npm dark theme mode do this
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { useEffect } from "react";
import { api } from "../convex/_generated/api"; // Adjust path if needed
import AppSideBar from "@/components/custom/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";

function Provider({ children }) {
  const [messages, setMessages] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const convex = useConvex(); //using convex for fetching data from database

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    //checking if user is authenticated or not
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      //fecth from database
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });

      setUserDetail(result);
      console.log(result);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <SidebarProvider defaultOpen={true}>
                <AppSideBar />
                {children}
              </SidebarProvider>
            </NextThemesProvider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
