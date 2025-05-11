'use client'

import { useSocket } from '@/hooks/useSocket';
import { useStore } from '@/hooks/useStore';
import { useUserInformation } from '@/hooks/useUserInformation';
import { Participants } from '@/type/type';

import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react'
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";


import { useCallManager } from '@/hooks/useCallMenager';


type ConversationRightProsp={
  isPrivate?:boolean
  userId?:string
}

export const ConversationRight = ({isPrivate,userId}:ConversationRightProsp) => {

  const userData=useUserInformation()

  const socket=useSocket()

  const {onlineUserList,setOnGoingCall}=useStore()

  const {startCall}=useCallManager()
  
  

  const currentUser=onlineUserList.find((user)=>user?.userId==userData?.user?.id)
  const receiver=onlineUserList.find((user)=>user?.userId==userId)

  


  //handle video call start call

  const handlerCall=useCallback(async()=>{

    if(!socket||!currentUser||!receiver) return


    const participants:Participants={
      caller:currentUser ,
      
      receiver:receiver
    }

    setOnGoingCall({
      participants,
      isRinging:false
    })

    await startCall()


  },[socket,currentUser,startCall,receiver,setOnGoingCall])

  useEffect(()=>{
    if(!socket) return

    socket.emit("onlien-user",userData?.user?.id)

  },[socket,userData])



  return (
    <div className={clsx('gap-3  items-center',
      isPrivate ?"flex":"hidden"
    )}>
        <FaVideo 
         onClick={handlerCall}
         size={20}
         className='text-v-grayText cursor-pointer'
        />
         {receiver?.userId}
        <IoCall
         size={20}
         className='text-v-grayText cursor-pointer'
        />

        {}
        
       
      
       
        

    </div>
  )
}
