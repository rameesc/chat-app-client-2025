'use client'

import React, { useEffect, useState } from 'react'
import { ChatContact } from './ChatContact'

import {  useQueryGetAllMessage } from '@/hooks/useQueryMessage'
import {useInView} from 'react-intersection-observer'
import { useSocket } from '@/hooks/useSocket'
import { useStore } from '@/hooks/useStore'

import { ConversationType, MessageType } from '@/type/type'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useUserInformation } from '@/hooks/useUserInformation'
import { TypingChat } from './TypingChat'
import { dateFormatted } from '@/helper/dateFormatted'

import ScrollableFeed from 'react-scrollable-feed'

type MessageAll={ [key:string]: { message:MessageType }[] }


export const ChatBox = () => {
  
// const [allData,setAllData]=useState<MessageType[]>([])

const [groupedMessages, setGroupedMessages] = useState<MessageAll>({});




const user =useUserInformation()

   const isMe=user?.user?.id
 

  const {data,isPending,fetchNextPage,hasNextPage}=useQueryGetAllMessage()

  // const messages = data && data.pages.flatMap((page)=>page.messages)||[]
  
  // const groupped=useAllMesssageWithDateGroup(messages)

  const {selectChat,typingUser,setTypingUser}=useStore()

  const clinetQuery=useQueryClient()

  const socket =useSocket()


  //all messages


    
    
  useEffect(()=>{
    if(data){

    
      const messages = data.pages.flatMap((page)=>page.messages)

      setGroupedMessages({})

      messages.forEach((mes)=>{
       

        
        const heading=dateFormatted(mes?.createdAt)
        setGroupedMessages((prev)=>{
          const update={...prev}

          if(!update[heading]){
            update[heading]=[]
          }
          update[heading]=[...update[heading],{message:mes}]

          return update


        })
        
        
     })
   
             

     
    // setAllData(messages)
     }

  },[selectChat,data])

  
  
  
  


  

  const {ref,inView}=useInView()

   useEffect(()=>{
    if(inView && hasNextPage){
     
      //  setCurrentPage(currentPage+1)
     
      fetchNextPage()
    }
   },[fetchNextPage,inView,hasNextPage])


   
   


   useEffect(()=>{
    if(!socket ||!selectChat) return

      socket.emit('join_room',selectChat)
      //recieved_message

      const handleNewMessage=(message:MessageType)=>{
           
          //  if(selectChat==message?.conversation?._id){
          
          //     setAllData((pre)=>[...pre,message])

          //  }

          
          const keyDate=dateFormatted(message?.createdAt)
            setGroupedMessages((prev)=>{
              const update={...prev}

              if(!update[keyDate]){
                update[keyDate]=[]
              }
              update[keyDate]=[...update[keyDate],{message:message}]

              return update


            })
           

          

           clinetQuery.setQueryData(['conversation'],(oldData:ConversationType[])=>{

            return oldData

           })

           
        
      }

      const fileHandler=(message:MessageType[])=>{
        message.forEach((mes)=>{

         

          const keyDate=dateFormatted(mes?.createdAt)

           return setGroupedMessages((prev)=>{
              const update={...prev}

              if(!update[keyDate]){
                update[keyDate]=[]
              }
              update[keyDate]=[...update[keyDate],{message:mes}]

              return update


            })
        })

        

        // setAllData((pre)=>[...pre,...message])

      }

      // received_message recieved_message
       socket.on("recieved_message",handleNewMessage)
      socket.on("recieved_file",fileHandler)


      socket.on("typing",(user:string)=>{
        setTypingUser(user)
       
      })

      socket.on("stop_typing",()=>{
        setTypingUser(null)
        
      })

      

      
     
      return ()=>{
        socket.emit("leave_room",selectChat)
        socket.off('recieved_message',handleNewMessage)
        socket.off("recieved_file",fileHandler)
        socket.off("typing")
        socket.off("stop_typing")
      
      }

   },[socket,selectChat])

   

  return (
    
    <div className='w-full relative  bg-[url(/assets/images/bg-chat.jpg)] h-[80%] flex-col gap-3 overflow-hidden  flex p-5'>
     
     <ScrollableFeed
       className="hide-scrollbar"
       
       
     >
            <div   className='flex flex-col gap-2 '>
             {/* {allData && allData?.map((mes)=>(

               <ChatContact
            
                key={mes?._id}
                contact={mes?.contect}
                contactType={mes?.contectType}
                date={mes?.createdAt}
                messageId={mes?._id}
                sender={mes?.sender}

               />

             ))} */}
         
             {Object.entries(groupedMessages).map(([heading,mes])=>(
              <div key={heading} className='flex flex-col gap-2'>
                <div className='bg-[#5abaf1] self-center p-1 rounded-md'>
                  <p>{heading}</p>
                </div>
                {mes &&mes?.map(({message})=>(
                  <ChatContact
            
                  key={message?._id}
                  contact={message?.contect}
                  contactType={message?.contectType}
                  date={message?.createdAt}
                  messageId={message?._id}
                  sender={message?.sender}
  
                 />

                ))}
                
              </div>
             ))} 
          
            </div>

            <div className={clsx(' w-[80px]  p-1 rounded-md  font-bold whitespace-pre-line flex flex-col',
                  typingUser==null ?"hidden":"block",
                 typingUser!=null && typingUser==isMe? " hidden":" self-start "
             )}>
              <TypingChat/>
            </div>
              
       
       
        <div ref={ref} className=' p-2 text-blue-500 text-center '>{isPending&&'loading...'}</div>
        </ScrollableFeed>
        
       
      </div>
     
   
  )
}
