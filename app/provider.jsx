"use client" //client side rendering
import React from 'react';  //for dark theme providing after installing npm dark theme mode do this
import { ThemeProvider as NextThemesProvider } from "next-themes"

function Provider({children}) {
    return (
        <div>
            <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {children}
            </NextThemesProvider>
        </div>
    )
}

export default Provider;