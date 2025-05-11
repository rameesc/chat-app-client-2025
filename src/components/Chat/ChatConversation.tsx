'use client'

import React, {useMemo} from 'react'

import { ChatBox } from './ChatBox'
import { ChatBoxButtom } from './ChatBoxButtom'
import { FileEdidtingSesstion } from './FileEdidtingSesstion'
import { useStore } from '@/hooks/useStore'
import { useQuerSingleConversation } from '@/hooks/useQueryConversation'
import { ChatSkeltone } from '../Skeltone/ChatSkeltone'
import { useRouter } from 'next/navigation'
import { SingleChatPrivate } from './SingleChatPrivate'
import { useUserInformation } from '@/hooks/useUserInformation'

import { contactLenght } from '@/helper'
import { VocieMessageItem } from './VocieMessageItem'
import clsx from 'clsx'

import { useResponsiveLength } from '@/hooks/useResponsiveLength'


export const ChatConversation = () => {
  
          const {files,reconding,setSelectChat}=useStore()
          const {data,isPending}=useQuerSingleConversation()
          const router=useRouter()
          const authUser=useUserInformation()
        

          const lenth=useResponsiveLength(10,5,400)
         

     

    
  
    
     const userAccountHandler=(id:string,chat:string)=>{

     
       router.push(`/Account/${id}/?chat=${chat}`)

     }

     const backButtonHandler=()=>{
       setSelectChat('')

     }
    

     const isPrivate=useMemo(()=>{
       return data?.type=='private'
    },[data?.type])   

  


   const itNotAuthUser=useMemo(()=>{
      
    
     return data?.participants?.filter((user)=>user?._id!==authUser?.user?.id)||[]

   },[data?.participants,authUser])


   const groupUserName=useMemo(()=>{
    return data?.participants?.map((user)=>user?.userName).toLocaleString()
   

   },[data?.participants])


   if(isPending){

    return <ChatSkeltone/>

   }
  

   return (
    <div className={clsx(' bg-white w-[100%] h-[100%]   rounded-md  block ',
        // selectChat ? 'block':" hidden"
    
    )}>
        
         {isPrivate ?(
          <SingleChatPrivate
           action={()=>userAccountHandler(itNotAuthUser[0]?._id as string , data?.type as string)}
           image={itNotAuthUser[0]?.picture as string}
           name={itNotAuthUser[0]?.userName as string}
           userId={itNotAuthUser[0]?._id}
           isPrivate={isPrivate}
           backHandler={backButtonHandler}
           
         />

         ):(
          <SingleChatPrivate
           action={()=>userAccountHandler(data?._id as string , data?.type as string)}
           image={data?.groupPicture as string}
           name={data?.groupName as string}
           isPrivate={isPrivate}
           userNames={contactLenght(groupUserName as string,lenth)}
           backHandler={backButtonHandler}
           
          />
         )}
          
        
          {files.length>0 ?(
            <FileEdidtingSesstion/>
          ):(
            <>
            <ChatBox/>
            {reconding ?(
             <VocieMessageItem/>
            ):(
              <ChatBoxButtom/>
            )}
            
            </>
          )}
          

       
    </div>
  )
}
