'use client'


import React, { useCallback, useEffect} from 'react'

import { ChatItemCard } from './ChatItemCard'
import { MessageAccountItem } from './MessageAccountItem'


import { useGetAllConversation } from '@/hooks/useQueryConversation'
import { UserSkeltone } from '../Skeltone/userSkeltone'
import { DataNotFound } from './DataNotFound'
import clsx from 'clsx'
import { useStore } from '@/hooks/useStore'
import { useSocket } from '@/hooks/useSocket'
import { useUserInformation } from '@/hooks/useUserInformation'


import { CallPopapItem } from './call/CallPopapItem'
import { CallNotification } from './call/CallNotification'
import { AnswerMessage, CandidateMessage, OfferMessage, OnlienUser } from '@/type/type'
import { CallItem } from './call/CallItem'
import { useCreatePeerConnection, useEndCall } from '@/hooks/useMediaStream'

import { useCallManager } from '@/hooks/useCallMenager'



export const ChatContactList = () => {

  const socket = useSocket()
  const callend =useEndCall()
  const {onGoingCall,setOnGoingCall,setOnlienUesr,localStrem,setLocalStrem}=useStore()
  

  const userData=useUserInformation()
 
  const peerCreate=useCreatePeerConnection()
  
  const {data,isPending,refetch}=useGetAllConversation()
 

   const {answerCall}=useCallManager()


    // if(userData?.status=='loading'){
    //   return <div>loading..</div>
    // } 
  
  

  useEffect(()=>{

    if(!socket||!userData?.user) return

     socket.emit("user-account",userData?.user?.id)
     socket.emit("onlien-user",userData?.user?.id)
     //update user account list

     const updateUserList=()=>{
      refetch()
     }


     //get online user
      const onlienUesrHanedler=(online:OnlienUser[])=>{
       setOnlienUesr(online)

      }

     socket.on("online-user",onlienUesrHanedler)
     socket.on("update",updateUserList)

     return ()=>{
      socket.emit('leave-user-account',userData?.user?.id)
    
      socket.off("update", updateUserList)
      socket.off("online-user",onlienUesrHanedler)
    }

  },[socket,userData?.user])


  

  //incoming call handler

  const handleIncommingCall=async(data:OfferMessage)=>{

   
     if(!data?.participants) return
   
    setOnGoingCall({
      participants:data?.participants,
      isRinging:true
    })

    const pc =peerCreate()

    await pc.setRemoteDescription(new RTCSessionDescription(data?.offer))

    
  }

  //handler answer

  const handlAnswer=async(data:AnswerMessage)=>{

    if(!data?.answare) return

    const pc =  peerCreate()

    await pc.setRemoteDescription(new RTCSessionDescription(data?.answare))

  }

  //candidate

  const handleCandidate=async(data:CandidateMessage)=>{

     if(!data?.candidate)  return
     const pc =  peerCreate()
      await pc.addIceCandidate(new RTCIceCandidate(data?.candidate))

    

  }

  //handleLeave

  const handleLeave=async()=>{
    await callend()
  }

   
  useEffect(()=>{

    if(!socket) return

    
    socket.on("incomingCall-offer",handleIncommingCall)
    socket.on("leave",handleLeave)
    socket.on("answer-call",handlAnswer)
    socket.on("candidate",handleCandidate)
           
    

    return ()=>{
      socket.off("incomingCall-offer",handleIncommingCall)
      socket.off("leave",handleLeave)
      socket.off("answer-call",handlAnswer)
      socket.off("candidate",handleCandidate)
     
     
    }

  },[socket,handlAnswer,handleCandidate,handleIncommingCall,handleLeave])

  


  //rejectcall
  const handleCallReject=async()=>{
 
   if(!onGoingCall?.participants)  return
 
  
    setOnGoingCall({
      participants:onGoingCall?.participants,
      isRinging:false
    })
    await callend()
  }
  

  //join Call
  const handleJoinCall=useCallback(async()=>{

    if(!onGoingCall?.participants||!socket) {
      
      return
    }
   
    await answerCall()
  
   
  },[socket,onGoingCall,setLocalStrem])
  
  
  
  if(isPending){
    return <div className='flex flex-col gap-2 bg-white w-[100%] md:w-[400px] h-full p-5'>
              <UserSkeltone/>
              <UserSkeltone/>
              <UserSkeltone/>
         </div>
  }

  if(data && data.length==0){
       return <div className='flex flex-col gap-2 bg-white h-full w-[100%] md:w-[400px] p-5'>
              <DataNotFound
                title='User Date Not Found'
              />
         </div>

  }

  return (
    
    <div  className={clsx('bg-white w-[100%] md:w-[400px] h-full flex flex-col overflow-y-scroll   p-5 ',
     
    )}>
        
        <ChatItemCard
          title='Message'
        >
            <div className='flex flex-col h-full   gap-4  '>
              {data && data.map((account)=>(
                <MessageAccountItem
                   key={account?._id}
                   conversationId={account?._id}
                   image={
                    account?.type=='group'?(
                      account?.groupPicture as string
                    ):(
                      account?.participants[0]?.picture
                    )
                    }
                   notification={account?.messages.length.toString()}
                   lastMessage={account?.lastMessage}
                   name={
                    account?.type=='group'?(
                      account?.groupName as string
                    ):(
                      account?.participants[0]?.userName
                    )
                   }
                   thisUserId={account?.type=='private' ? (account?.participants[0]?._id):''}
             
              />

              ))}
              
             </div>
             
         

        </ChatItemCard>
        {onGoingCall?.isRinging && (
          <CallPopapItem>
           
           <CallNotification
             callReject={handleCallReject}
             joinCall={handleJoinCall}
           />
          </CallPopapItem>

        )}
        {localStrem?.isLocalStrem &&(
          <CallPopapItem>
           
           <CallItem/>
         </CallPopapItem>

        )}
       
       
        
    </div>
  )
}
