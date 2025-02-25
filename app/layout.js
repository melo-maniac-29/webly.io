import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata = {
  title: "webly.io",
  description: "Webly.io is a platform for building web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <Provider>{children}</Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
