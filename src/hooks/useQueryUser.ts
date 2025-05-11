import { authAxios } from "@/config"
import { BlocktList, ContactList, UserType } from "@/type/type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { useStore } from "./useStore"






export const useQuerySearchUser=()=>{

    const search=useSearchParams()
     const keyword= search.get('search')

    return useQuery<UserType[]>({
        queryKey:['search-user',keyword],
        queryFn:async()=>{

            try{
                const queryParams = new URLSearchParams();
                if(keyword) queryParams.append("keyword",keyword)

                const {data}=await authAxios.get(`/auth/search-user?${queryParams.toString()}`)

                if(data?.status){

                    return data?.search || []
                }

                return []

            }catch(error:unknown){
                if(error instanceof Error){
                    toast.error(error.message)
                    return []
                }
            }
            
        }
    })
}

export const useQueryUserData=()=>{

    const params=useParams()
    
   

    return useQuery<UserType>({
        queryKey:['user-data'],
        queryFn:async()=>{

            try{
               
                const {data}=await authAxios.get(`/auth/get-user/${params?.userId}`)

                if(data?.status){

                    return data?.user || {}
                }

                return {}

            }catch(error:unknown){
                if(error instanceof Error){
                    toast.error(error.message)
                    return {}
                }
            }
            
        }
    })
}
export const useQueryUserContactList=(userId:string)=>{

   
    
   

    return useQuery<ContactList>({

        queryKey:['user-contact'],
        enabled:false,
        queryFn:async()=>{

            try{
               
                const {data}=await authAxios.get(`/auth/user-contact-list/${userId}`)

                if(data?.status){

                    return data|| {}
                }

                return {}

            }catch(error:unknown){
                if(error instanceof Error){
                    toast.error(error.message)
                    return {}
                }
            }
            
        }
    })
}

export const useQueryUserBlockList=()=>{

    const params=useParams()
    
   

    return useQuery<BlocktList>({
        queryKey:['user-block'],
        enabled:false,
        queryFn:async()=>{

            try{
               
                const {data}=await authAxios.get(`/auth/user-block-list/${params?.userId}`)

                if(data?.status){

                    return data|| {}
                }

                return {}

            }catch(error:unknown){
                if(error instanceof Error){
                    toast.error(error.message)
                    return {}
                }
            }
            
        }
    })
}

//block user

export  const useQueryBlockUser=()=>{

   
   const clientQuery=useQueryClient()
   return useMutation({
        mutationFn:async(blockUserId:string)=>{
            try{

                const {data}=await authAxios.put('/auth/blocked-unBlocked',{
                    blockUserId
                })

                if(data.status){
                   return toast.success(data?.message)
                }else{
                    return toast.success(data?.message)

                }
                

            }catch(error:unknown){

                if(error instanceof Error){
                   
                    toast.error(error?.message)
                }
            }

        },
        onSuccess:()=>{
            clientQuery.invalidateQueries({
                queryKey:['auth-user-data']
            })
        }
    })

}

//get-auth-user
export const useQueryAuthUserData=()=>{

    
    

    return useQuery<UserType>({
        queryKey:['auth-user-data'],
        queryFn:async()=>{

            try{
               
                const {data}=await authAxios.get(`/auth/get-auth-user`)

                if(data?.status){

                    return data?.user || {}
                }

                return {}

            }catch(error:unknown){
                if(error instanceof Error){
                    toast.error(error.message)
                    return {}
                }
            }
            
        }
    })
}

//contact user

export  const useQueryUnContactContactUser=()=>{

   
    const clientQuery=useQueryClient()
    return useMutation({
         mutationFn:async(friendIs:string)=>{
             try{
 
                 const {data}=await authAxios.patch('/chat/save-unsave-to-contact',{
                    friendIs
                 })
 
                 if(data.status){
                    return toast.success(data?.message)
                 }else{
                     return toast.success(data?.message)
 
                 }
                 
 
             }catch(error:unknown){
 
                 if(error instanceof Error){
                     console.error(error)
                     toast.error(error?.message)
                 }
             }
 
         },
         onSuccess:()=>{
             clientQuery.invalidateQueries({
                 queryKey:['auth-user-data']
             })
         }
     })
 
 }

 // update profile

 export const useQueryProfileChange=()=>{
    const clientQuery=useQueryClient()
   
   
    const {setUploadProfile}=useStore()
    return useMutation({
        mutationFn:async({formData}:{formData:FormData})=>{

            try{

                const {data}=await authAxios.patch('/auth/change-profile',formData)

                if(data.status){
                    
                    setUploadProfile(false)
                    return toast.success(data?.message)
                 }else{
                    
                     return toast.success(data?.message)
 
                 }



            }catch(error:unknown){
 
                 if(error instanceof Error){
                     console.error(error)
                     toast.error(error?.message)
                 }
             }

        },
        onSuccess:async()=>{
          
         
            clientQuery.invalidateQueries({
                queryKey:['auth-user-data']
            })
        }
    })
 }

