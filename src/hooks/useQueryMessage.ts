import { authAxios } from "@/config"
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { useStore } from "./useStore"
import { MessageType, SendMessageType } from "@/type/type"
import toast from "react-hot-toast"


//get all message for this chat
// export const useQueryGetAllMessage=()=>{
//     const {selectChat}=useStore()

//     const queryClient=useQueryClient()
    

//     return useQuery<MessageType[]>({
//          queryKey:['all-message',selectChat],
         
//          queryFn:async()=>{

//             try{

//                 const {data}=await authAxios.get(`/message/messages/${selectChat}`)

//                 if(data?.status){

//                     queryClient.invalidateQueries({
//                         queryKey:["conversation"]
//                     })
                    
//                     return data?.messages ||[]
//                 }
                

//                 return []


//             }catch(error:unknown){

//                 if(error instanceof Error){
//                     console.log(error?.message)
//                     return []
//                 }
//             }
//          },
         
         
//     })
    
// }


export type MessageTypeItem={
    message:string,
    status:boolean,
    messages:MessageType[],
    hasMore:boolean,
    nextPage:number|null,
    curretPage:number
}
export const useQueryGetAllMessage=()=>{
    const {selectChat,currentPage}=useStore()

  

   
    return useInfiniteQuery<MessageTypeItem>({
        queryKey:['all-message',selectChat,currentPage],
        queryFn:async({pageParam})=>{
           
            const {data}=await authAxios.get(`/message/messages/${selectChat}/?page=${pageParam}`)

           
            return data

            // if(data?.status){
            //     return data|| {}
            // }
            // return {}
        },
        initialPageParam:1,
        getNextPageParam:(lastPage)=>{
            if(lastPage?.hasMore){
              
                return  lastPage?.nextPage
            }
            return undefined

        },
        enabled:!!selectChat,
        // refetchOnWindowFocus:false,
        // staleTime:1000*60*5 //5 minutes
    })
    

   
    
}

//send message


export const useQuerySendMessage=()=>{
    const {selectChat,thisUser}=useStore()
    //conversation

    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async({contect,contectType}:SendMessageType)=>{

            try{

                const {data}=await authAxios.post(`/message/send-message`,{
                    contect,
                    contectType,
                    conversationId:selectChat,
                    thisUser:thisUser

                })

                if(!data?.status){
                    toast.error(data?.message)
                }

              


            }catch(error:unknown){

                if(error instanceof Error){
                    console.log(error?.message)
                    
                }
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['conversation']
            })
        }
    })
}
export const useQuerySendFiles=()=>{
   
    //conversation

    const {setFiles,setReconding}=useStore()
    


    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async(formData:FormData)=>{

            try{
                //files

                const {data}=await authAxios.post(`/message/upload-image`,formData)

               

                if(data?.status){
                    setReconding(false)
                   return setFiles([])
                }

                toast.error("something went wrong")

              


            }catch(error:unknown){

                if(error instanceof Error){
                    console.log(error?.message)
                    
                }
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['conversation']
            })
            // queryClient.invalidateQueries({
            //     queryKey:['all-message']
            // })
        }
    })
}
export const useQueryDeleteMessage=()=>{
   
    //conversation

    const {setMessageDeleteId,setDeleteMessage}=useStore()

    
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async(messageId:string)=>{

            try{
                //files

                const {data}=await authAxios.put(`/message/delete-message/${messageId}`)

               

                if(data?.status){
                    setMessageDeleteId(null)
                    setDeleteMessage(false)
                   return toast.success("delete")
                }

                toast.error(data?.message)

              


            }catch(error:unknown){

                if(error instanceof Error){
                    console.log(error?.message)
                    
                }
            }
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['conversation']
            })
            queryClient.invalidateQueries({
                queryKey:['all-message']
            })
        }
    })
}