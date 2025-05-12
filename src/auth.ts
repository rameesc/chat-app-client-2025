import NextAuth from "next-auth"
 import Google from "next-auth/providers/google"
 import Credentials from "next-auth/providers/credentials"
import { getUserWithEmail, loginWithGoogle } from "./helper/authUser"

console.log(process.env.AUTH_GOOGLE_ID)
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true // Allows linking Google to existing credentials accounts
    }),
    Credentials({
      async authorize(credentials) {

      
          if(!credentials?.email){
            return null
          } 
        

       const user=await getUserWithEmail(credentials.email as string)

       if(!user &&user==null){
         return null
       }

         return user
        
      },
    })
  ],
  pages:{
    signIn:'/login',
    error: '/login/error' // Add error page
    
  },
  callbacks:{

    async session({session,token}){

        if(token?.email){

           const user=await getUserWithEmail(token.email as string)
         
         if(user?.status){
          session.user={
            ...session.user,
            email:user?.email,
            name:user?.userName,
            image:user?.picture ,
            id:user?._id,
            loginSystem:user?.loginSystem,
            status:user?.status,
            accessToken:user?.accessToken,
            refreshToken:user?.refreshToken

          }
         }


        }

    
        return session

    },

    async jwt({token,user}){
      if(user){
        token.email=user.email
      }
        return token

    },

    async signIn({user,account,profile}){

      try{

        if(account?.provider=="google" && profile?.email){
          const {email,name,image}=user

          if(!email){
            console.error('missing email when you signIn with google')
            return false
          }
        
           const isUser=await getUserWithEmail(email as string)

            if(isUser?.email){
              return true
            }

            //save user data in db

           const isSuccess=await loginWithGoogle(email,image as string,name as string)

           

           if(isSuccess?.status){
            return true
           }

           return false



        }

        if(account?.provider=="credentials"){


          if(!user &&user==null){
            return false
          }
          return true
        }
        return false


      }catch (error) {
        console.error('SignIn error:', error)
        return false
      }
       
    }


  },
  secret:process.env.NEXTAUTH_SECRET
})