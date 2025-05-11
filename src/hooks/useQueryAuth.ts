

import { fetchData } from "@/config"
import { forgetPasswordValidation, loginValidation, registerValidation } from "@/schema"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {z} from 'zod'




// type ObectType={
//     message:string,
//     status:boolean
// }
export  const useQueryRegister=()=>{
   return useMutation({
        mutationFn:async(valuse:z.infer<typeof registerValidation>)=>{
            try{

                const {data}=await fetchData.post('/auth/use-sigup',valuse)

                if(data.status){
                    

                    return data 
                }
                return data


            }catch(error:unknown){

                if(error instanceof Error){
                    toast.error(error?.message)
                }
            }

        }
    })

}
export  const useQueryEmailVerififcation=()=>{

    const route=useRouter()
   return useMutation({
        mutationFn:async(token:string)=>{
            try{

                const {data}=await fetchData.post('/auth/email-verify',{token})

                if(data.status){

                    route.push('/login')
                    return data 
                }
                return data


            }catch(error:unknown){

                if(error instanceof Error){
                    toast.error(error?.message)
                }
            }

        }
    })

}

export  const useQueryLogin=()=>{

    const router=useRouter()
   
   return useMutation({
        mutationFn:async(valuse:z.infer<typeof loginValidation>)=>{
            try{

                const {data}=await fetchData.post('/auth/login',valuse)

                if(data.status){

                     await signIn("credentials",{
                        email:valuse?.email,
                        password:valuse?.password
                     })
                    toast.success(data?.message)
                    router.push('/login')
                }else{
                    return data

                }
                

            }catch(error:unknown){

                if(error instanceof Error){
                    console.error(error)
                    toast.error(error?.message)
                }
            }

        }
    })

}
export  const useQueryForgetPassword=()=>{

   
   
   return useMutation({
        mutationFn:async(valuse:z.infer<typeof forgetPasswordValidation>)=>{
            try{

                const {data}=await fetchData.post('/auth/forget-password',valuse)

                if(data.status){

        
                    return data
                }else{
                    return data

                }
                

            }catch(error:unknown){

                if(error instanceof Error){
                    console.error(error)
                    toast.error(error?.message)
                }
            }

        }
    })

}
export  const useQueryResetPassword=()=>{

   
   
   return useMutation({
        mutationFn:async({token,password}:{token:string,password:string})=>{
            try{

                const {data}=await fetchData.post('/auth/reset-password',{
                    token,
                    password
                })

                if(data.status){

        
                    return data
                }else{
                    return data

                }
                

            }catch(error:unknown){

                if(error instanceof Error){
                    console.error(error)
                    toast.error(error?.message)
                }
            }

        }
    })

}