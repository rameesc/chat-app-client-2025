'use client'

import React, { useEffect, useRef, useState } from 'react'
import WAveSurfer from "wavesurfer.js"
import { FaPlay } from "react-icons/fa";
import { CgPlayPause } from "react-icons/cg";
export const AudioItems = () => {
    
    const waveformRef = useRef<HTMLDivElement>(null)
    const waveSurferRef = useRef<WAveSurfer | null>(null);

    const [isPlay,setIsplay]=useState(false)

    useEffect(()=>{
        if(waveformRef.current){

            waveSurferRef.current=WAveSurfer?.create({
                container:waveformRef?.current,
                progressColor: '#4caf50',
                height: 30,
                barWidth: 2,
                
              
                dragToSeek:true
            });

            waveSurferRef.current.load('/assets/voice/new.mp3')
           
        }

        return () => waveSurferRef.current?.destroy();

    },[])


    const playPause=()=>{
        if(waveSurferRef){
            waveSurferRef.current?.playPause()
            setIsplay((pre)=>!pre)
        }
    }

   
    
  return (
    <div>
           {/* <audio controls >
              <source  src='/assets/voice/new.mp3'/>
           </audio> */}

           <div className=' border-2 border-v-borderColor p-2 rounded-md w-[100%] lg:w-[500px] flex items-center gap-2'>

             {isPlay ?(
                 <CgPlayPause 
                 onClick={playPause}
                size={22}/>
                
             ):(
                <FaPlay
                onClick={playPause} 
                
                 size={22}/>
              
             )}
            
             <div 
               className='w-[100%] '
              ref={waveformRef} />

            </div>
           
           
    </div>
  )
}
