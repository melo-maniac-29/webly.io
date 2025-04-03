"use client"; 
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { useConvex } from "convex/react";
import { api } from "../convex/_generated/api";
import AppSideBar from "@/components/custom/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

// Context imports
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { ActionContext } from '@/context/ActionContext';

export function Provider({ children }) {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [action, setAction] = useState();
  const convex = useConvex();
  const router = useRouter();
  
  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user){
        router.push('/');
        return;
      }
      const result = await convex.query(api.users.GetUser, {
        email: user?.email
      });
      setUserDetail(result);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
          {/* Create context providers with their values */}
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <ActionContext.Provider value={{ action, setAction }}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                  <TooltipProvider>
                    <SidebarProvider>
                      <div className="absolute">
                        <AppSideBar />
                      </div>
                      <Header />
                      <div className="pl-0 md:pl-4 transition-all duration-300">
                        {children}
                      </div>
                    </SidebarProvider>
                  </TooltipProvider>
                </ThemeProvider>
              </ActionContext.Provider>
            </MessagesContext.Provider>
          </UserDetailContext.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
