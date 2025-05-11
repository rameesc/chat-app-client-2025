
import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user:DefaultSession["user"] &{
            email:string,
            name:string,
            image:string,
            loginSystem:string,
            status:string,
            accessToken:string,
            refreshToken:string
        
        }

    }
}