'use cleint'

import { IconButton } from '@/components/Button/IconButton'
import { useEndCall } from '@/hooks/useMediaStream';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { IoVideocamSharp } from "react-icons/io5";
import { IoVideocamOffSharp } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";

type CallContacinerProsp={
    stream:MediaStream |null,
    isLocalStreem:boolean,
    isOnCall:boolean
}
export const CallContaciner = ({stream,isLocalStreem}:CallContacinerProsp) => {

    const videoRef=useRef<HTMLVideoElement>(null)

    const [mic,setMic]=useState(true)
    const [video,setVideo]=useState(true)

    const callend =useEndCall()

    useEffect(()=>{

        if(videoRef.current && stream){
            videoRef.current.srcObject=stream
        }

        if(stream){
            const VideoTrack=stream.getVideoTracks()[0]
            VideoTrack.enabled = VideoTrack.enabled

            setVideo(VideoTrack.enabled)
        }

        if(stream){
            const audioTrack=stream.getAudioTracks()[0]
            audioTrack.enabled = audioTrack.enabled

            setMic(audioTrack.enabled)
        }

    },[stream])

    const toggleMic=useCallback(()=>{

        if(stream){
            const audioTrack=stream.getAudioTracks()[0]
            audioTrack.enabled = !audioTrack.enabled

            setMic(audioTrack.enabled)
        }
            

    },[stream])

    const toggleVide=useCallback(()=>{

        if(stream){
            const VideoTrack=stream.getVideoTracks()[0]
            VideoTrack.enabled = !VideoTrack.enabled

            setVideo(VideoTrack.enabled)
        }
            

    },[stream])

    const endUesrCallHandler=async()=>{
        await callend()
    }
  return (
    <div>
       <div className=' relative'>
         <video 
          ref={videoRef}
         
          className='rounded-md w-[500px] h-[300px]' 
          autoPlay
          playsInline
          muted={isLocalStreem}
         />

         <div className='bg-white flex gap-2 absolute  bottom-[20px] left-[50%] translate-[-50%] p-2 rounded-md'>
          <IconButton
           icon={mic ? <AiOutlineAudioMuted/> :<AiOutlineAudio/>}
           action={toggleMic}
           type='button'
           disabled={false}
           style='w-[30px] h-[30px] rounded-full bg-[#2c2929] hover:bg-[#0f0f0f]'
          />
          <IconButton
           icon={video ? <IoVideocamOffSharp/> :<IoVideocamSharp/>}
           action={toggleVide}
           type='button'
           disabled={false}
           style='w-[30px] h-[30px] rounded-full bg-[#2c2929] hover:bg-[#0f0f0f]'
          />
          <IconButton
           icon={<MdCallEnd/>}
           action={endUesrCallHandler}
           
           type='button'
           disabled={false}
           style='w-[30px] h-[30px] rounded-full bg-red-500 hover:bg-red-600'
          />
          </div>

        </div>
       
        
    </div>
  )
}
