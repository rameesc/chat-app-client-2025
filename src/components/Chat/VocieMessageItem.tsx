'use client'

import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { FaMicrophone } from "react-icons/fa6";
import { useStore } from '@/hooks/useStore';
import clsx from 'clsx';

import { MdPause } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useQuerySendFiles } from '@/hooks/useQueryMessage';
import { SendButton } from '../Button/SendButton';
import { IconButton } from '../Button/IconButton';

export const VocieMessageItem = () => {

    const {setReconding,selectChat}=useStore()

    const {mutate,isPending}=useQuerySendFiles()

    // const [starReconging,setStartReconding]=useState(false)

    // const [audioBlob,setAudioBlob]=useState<Blob[] >([])

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)

    const [hiddenBtn,setHiddemBtn]=useState(false)

    const [isPause,setIsPause]=useState(false)

    const [time,setTime]=useState(0)

    const [previewAudio,setPreviewAudio]=useState<Blob>()

    const timerRef =useRef<NodeJS.Timeout|null>(null)


  

    const stopReconding=()=>{
      
        mediaRecorderRef.current?.stop()
        // setStartReconding(false)
        setIsPause(false)
        setTime(0)
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }

    // const pauseTiming=()=>{
    //     if(timerRef.current){
    //         clearInterval(timerRef.current)
    //     }

    // }

    //start timing
    const startTiming=()=>{

        timerRef.current=setInterval(()=>{
            setTime((pre)=>{
                if(pre >=59){
                    stopReconding()
                    setIsPause(true)
                   return 60
                   
                }
                return pre+1
            })

        },1000)
    }

    const startRecondingHandler=async()=>{

        const strem = await navigator.mediaDevices.getUserMedia({audio:true})
        const mediaRecorder= new MediaRecorder(strem)
       
          const chunks:BlobPart[]=[]
        mediaRecorder.ondataavailable =(event)=>{
            chunks.push(event.data)
          
           
          
           
        }
        mediaRecorder.onstop=()=>{
            const blob = new Blob(chunks , {type:"audio/mp3"})
            
            setPreviewAudio(blob)
        }

       

        mediaRecorder.start();
        mediaRecorderRef.current=mediaRecorder;

        // setStartReconding(true)
        setHiddemBtn(true)
        startTiming()
        // setAudioBlob([])

        
    }

    const formatTime=(seconds:number)=>{
        const mims = Math.floor(seconds/60).toString().padStart(2,'0')
        const secs= (seconds % 60).toString().padStart(2,'0')
        return `${mims}:${secs}`
    }
    const backToNormal=()=>{
        setReconding(false)
        // setStartReconding(false)
    }

    //pause 

    const pauseReconding=()=>{
        if(mediaRecorderRef.current?.state==='recording'){
            stopReconding()
          
            setIsPause(true)

        }
    }

    //resume
    const resumeReconding=()=>{

        startRecondingHandler()
        setIsPause(false)
           
        

    }

   //upload audio
   const uploadAudioHandler=()=>{

     if(!previewAudio) return;

      const formData = new FormData();
       formData.append('files',previewAudio)
       formData.append('conversationId',selectChat)
       stopReconding()
       mutate(formData)


   }
  return (
    <div className=' s h-[60px] relative w-full flex justify-center flex-col items-center mt-[2px] '>
        <div className={clsx('flex justify-center items-center gap-2 ',
            hiddenBtn ?"hidden":"block"
        )}>
              
             <IconButton
                action={backToNormal}
                type='button'
                style='hover:bg-red-500 hover:text-white border-2 border-red-500 bg-white text-red-500 cursor-pointer'
                
                icon={ <IoClose/>}
            />
            
            <IconButton
                action={startRecondingHandler}
                type='button'
                style='hover:bg-red-500 hover:text-white border-2 border-red-500 bg-white text-red-500 cursor-pointer'
                
                icon={ <FaMicrophone/>}
            />

        </div>

        <div className={clsx('flex  justify-between gap-2',
              hiddenBtn ?"block":"hidden"
        )}>
           
             <IconButton
                action={backToNormal}
                type='button'
                style='bg-red-500 hover:bg-red-600  rounded-full w-[35px] h-[35px] cursor-pointer'
                
                icon={<MdDelete/>}
              />


            <div className='flex gap-2 rounded-md items-center border-1 border-red-500 p-1'>
                <FaMicrophone className='text-red-500'/>
                <p>{formatTime(time)}</p>
            </div>

            <div>
               {isPause ?(
                <div className='flex gap-2'>
                  <Button 
                   onClick={resumeReconding }
                   className='hover:bg-red-600 hover:text-green    bg-red-500 text-white cursor-pointer'>
                  
                    <span>Resatrt</span>
                   <MdPause size={22}/>
                  </Button>
                  
                  <SendButton
                    sendImage={uploadAudioHandler}
                    disabled={isPending}
                  />
               </div>
                

               ):(
            

              <IconButton
                action={pauseReconding}
                type='button'
                style='rounded-full w-[35px] h-[35px]   text-white flex justify-center items-center cursor-pointer'
                
                icon={<FaMicrophone className='text-red-500 blink-animation'/>}
              />

               )}
                

            </div>
            
            {/* <Button 
                onClick={backToNormal}
                className='hover:bg-green-600 hover:text-green   bg-green-500 text-white'>
               <span> Send</span>
               <IoSend/>
             </Button> */}
        </div>
        
       {isPause && previewAudio &&(
         <div className={clsx(' absolute w-[100%] lg:w-[400px] p-2 translate-y-[-50%] bg-white  m-2',
            isPause && previewAudio  ? 'top-[-50px] duration-300 ease-in-out visible' :'top-[0px] invisible'
         )}>
            <p className='text-blue-600'>PreView</p>
            <audio 
              className='w-[80%] '
              src={ URL.createObjectURL(previewAudio)} 
              nonce='1'
              
              controls />
         </div>
        )}
        
    
    </div>
  )
}
