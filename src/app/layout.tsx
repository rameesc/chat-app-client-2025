import type { Metadata } from "next";

import "@/style/globals.css";
import { ToastProvider } from "@/provides/ToastProvider";
import TanstackQueryProvider from "@/provides/TanstackQueryProvider";
import { AuthSessionProvider } from "@/provides/AuthSessionProvider";



export const metadata: Metadata = {
  metadataBase:new URL(process.env.SITE_URL!),
  title: {
    absolute:'Chat-Application',//it applied all children components if they dont add medata
    // default:'rfrfrf',// it normal example: we do title:something like that
     template:'%s | Chat-Application'// it applied all children componets even if they applied and one thing  we do like this %s it applied likes exapmle about | hellow
  },
  description:'this is a chat application you can chat with your friends and anyone eles',
  openGraph:{
    title:'Chat-Application',
    description:'This is a chat application you can chat with your friends and anyone eles',
    type:"website",
    locale:"en-US",
    siteName:"Chat-Application",
    url:process.env.SITE_URL

  }
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
       <body className="">
       <AuthSessionProvider>
          <TanstackQueryProvider>
           <ToastProvider/>
           {children}
          </TanstackQueryProvider>
         </AuthSessionProvider>
       </body>
     
    </html>
  );
}
