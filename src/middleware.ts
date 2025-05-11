

import { NextRequest,NextResponse } from "next/server";
import {auth} from '@/auth'
import { authRoutes, protectRoutes } from "./helper/router";



export const middleware=async(request:NextRequest)=>{

  const user=  await auth()
  const {nextUrl}=request

  

  const isLoggedIn=!!user?.user

  
  

  

  if(isLoggedIn && authRoutes.includes(nextUrl.pathname)){

        return NextResponse.redirect(new URL('/',nextUrl))

        

    
  }

  
  if(!isLoggedIn && protectRoutes.includes(nextUrl.pathname)){

        return NextResponse.redirect(new URL('/login',nextUrl))

        

    
  }

  
 
  


  


}
export const config = {
    matcher:[ '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}