"use client"; //client side rendering
import React from "react"; //for dark theme providing after installing npm dark theme mode do this
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from "@/context/MessagesContext";

function Provider({ children }) {
    const[messages,setMessages] = useState();
  return (
    <div>
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
    </div>
  );
}

export default Provider;
