import { authAxios } from "@/config"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useStore } from "./useStore"
import { ConversationType } from "@/type/type"
import { useRouter, useSearchParams } from "next/navigation"



export const useGetAllConversation=()=>{

    const search=useSearchParams()

    const category=search.get('category')
    

    return useQuery<ConversationType[]>({
        queryKey:['conversation',category],
        queryFn:async()=>{

            try{

                const queryParams =new URLSearchParams();
                if(category) queryParams.append('category',category);

                const {data}=await authAxios.get(`/chat/all-conversation?${queryParams}`)

                

                if(data?.status==true){
                    return data?.allConversation
                }

                return []
            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)

                    return []
                }
            }
        }
    })
}


//create conversation

export  const useQueryCreateConvesation=()=>{
    const {setSelectChat}=useStore()
    const queryClient=useQueryClient()

    const router=useRouter()

    return useMutation({
        mutationFn:async(fomData:FormData)=>{

            try{

                //type
                const {data}=await authAxios.post(`/chat/create-conversation`,fomData)

                if(data?.status){

                    setSelectChat(data?.conversationId)
                    router.push('/')
                    return
                }
              
               


            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)

                   
                }
            }

        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['single-chat']
            })
        }
    })
}

//select single conversation

export const useQuerSingleConversation=()=>{

    const {selectChat}=useStore()
    return useQuery<ConversationType>({
        queryKey:["single-chat",selectChat],
        queryFn:async()=>{

            try{
                const {data}=await authAxios.get(`/chat/single-conversation/${selectChat}`)

                if(data?.status){
                    return data?.conversation ||{}

                }

                return {}

            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)

                    return {}

                   
                }
            }
        }
    })
}


//remove from group

export  const useQueryRemoveFromGroup=()=>{
    const {selectChat}=useStore()
    const queryClient=useQueryClient()

   

    return useMutation({
        mutationFn:async({userId}:{userId:string})=>{

            try{

                //type
                const {data}=await authAxios.post(`/chat/remove-from-group`,{
                    userId,
                    chatId:selectChat
                })

                if(data?.status){

                   toast.success(data?.message)
                   return
                }
              
                toast.error(data?.message)
                return


            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)
                    return

                   
                }
            }

        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['single-chat']
            })
        }
    })
}

//add admin role
export  const useQueryAddAdminRole=()=>{
    const {selectChat}=useStore()
    const queryClient=useQueryClient()

   

    return useMutation({
        mutationFn:async({userId}:{userId:string})=>{

            try{

                //type
                const {data}=await authAxios.post(`/chat/add-admin`,{
                    userId,
                    chatId:selectChat
                })

                if(data?.status){

                   toast.success(data?.message)
                   return
                }
              
                toast.error(data?.message)
                return


            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)
                    return

                   
                }
            }

        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['single-chat']
            })
        }
    })
}
//add exit from group
export  const useQueryExitFromGroup=()=>{
    const {selectChat}=useStore()
    
   

   

    return useMutation({
        mutationFn:async()=>{

            try{

                //type
                const {data}=await authAxios.post(`/chat/exited-from-group`,{
                   
                    chatId:selectChat
                })

                if(data?.status){

                   toast.success(data?.message)
                   return
                //    router.push('/')
                //    setSelectChat('')
                   
                }
              
                toast.error(data?.message)
                return


            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)
                    return

                   
                }
            }

        },
        
    })
}
//add exit from group
export  const useQueryDeleteGroup=()=>{
    const {selectChat,setSelectChat}=useStore()
   

    const router=useRouter()

   

    return useMutation({
        mutationFn:async()=>{

            try{

                //type
                const {data}=await authAxios.post(`/chat/delete-group`,{
                   
                    chatId:selectChat
                })

                if(data?.status){

                   toast.success(data?.message)
                   router.push('/')
                   setSelectChat('')
                   return
                }
              
                toast.error(data?.message)
                return


            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)
                    return

                   
                }
            }

        },
        
    })
}

//add new member

export  const useQueryAddNewMembers=()=>{
    const {selectChat}=useStore()
   
    const queryClient=useQueryClient()

    return useMutation({
        mutationFn:async({userIds}:{userIds:string[]})=>{

            try{

                //type
                const {data}=await authAxios.post(`/chat/add-new-memders`,{
                   
                    chatId:selectChat,
                    userIds
                })

                if(data?.status){

                   toast.success(data?.message)

                   return
                }
              
                toast.error(data?.message)
                return


            }catch(error:unknown){
                if(error instanceof Error){

                    toast.error(error?.message)
                    return

                   
                }
            }

        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['single-chat']
            })
        }
        
    })
}