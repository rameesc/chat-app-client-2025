'use client'


import { ContectType, UserType } from '@/type/type'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { UserAvatar } from '../UserAvatar'

import { S3BUCKET_IMG_URL } from '@/config'


type AudioContactProps={
    contactType:ContectType
    contact:string
    sender:UserType
}
export const AudioContact = ({contact,contactType ,sender}:AudioContactProps) => {

   
    // const linkRef = useRef<HTMLAnchorElement>(null);
    const waveFormRef =useRef<HTMLDivElement>(null)
    const waveSurferRef = useRef<WaveSurfer|null>(null)

    // const [isPause,setIsPause]=useState(false)
    const [audioUrl] = useState(`${S3BUCKET_IMG_URL}/${contact}`)
   

    

    useEffect(()=>{
        if( !waveFormRef.current) return

       

         waveSurferRef.current= WaveSurfer?.create({
                container:waveFormRef?.current,
                progressColor:'#4caf50',
                height: 30,
                barWidth: 2,
                
              
                dragToSeek:true,
                url:"https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
               
            });

            // waveSurferRef.current.on("play",()=>setIsPause(true))
            // waveSurferRef.current.on("pause",()=>setIsPause(false))
            // waveSurferRef.current.on("finish",()=>setIsPause(false))

            
      
        
           
        return ()=> waveSurferRef.current?.destroy();

    },[audioUrl])

    // const playAndPause=()=>{
    //     waveSurferRef.current?.playPause()
        

    // }

    
  
  return (
    <div className={clsx('',
        contactType!=='audio' && 'hidden'
    )}>
        <div className='flex gap-2 items-center'>
            <div>
               
                <UserAvatar
                  image={sender?.picture}
                />
                
            </div>
           
            
              <audio 
             
              src={`${S3BUCKET_IMG_URL}/${contact}`} 
              className='w-[100%] md:w-[300px] lg:w-[300px]'

              controls
              />
           
           
        </div>
    </div>

)
}
