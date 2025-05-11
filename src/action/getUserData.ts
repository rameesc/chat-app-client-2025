"use server"

import { auth } from "@/auth"
import { BASA_URL} from "@/config"
import {  UserType } from "@/type/type"
import axios from "axios"

export const getUserData=async(userId:string)=>{

    try{
       const userData=await  auth()
       
               
        // const {data}=await fetchData.get(`/auth/get-user/${userId}`,{
        //     headers:{
        //         ["x-auth-uesr"]:session?.user?.accessToken
        //     }
        // })
      
        const {data}=await axios.get(`${BASA_URL}/auth/get-user/${userId}`,{
            headers:{
                ["x-auth-uesr"]:userData?.user?.accessToken
            }
        })

      

       
        if(data?.status){

            return data?.user as UserType || null
        }

        return null

      

    }catch(error:unknown){
        if(error instanceof Error){
          return null
           
        }
    }
}