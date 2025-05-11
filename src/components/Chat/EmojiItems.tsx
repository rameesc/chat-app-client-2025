'use client'

import React, { useEffect, useRef } from 'react'
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useStore } from '@/hooks/useStore';


export type EmojiObject = {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string;
  };
  
export const EmojiItems = () => {

    const closeEmoji=useRef<HTMLDivElement>(null)

    const {showEmoji,setShowEmoji,setEmojiMessage,emojiMessage}=useStore()

       
    //take message emoji
    const addEmoji=(email:EmojiObject)=>{

       
        setEmojiMessage(emojiMessage+email.native)

    }

    //close handler when you click out side of emoji it will be close
    const closeEmojiOutSideClick=(e:MouseEvent)=>{

        if(closeEmoji.current && !closeEmoji.current.contains(e.target as Node)){
            setShowEmoji(false)
        }

    }

    useEffect(()=>{
        if(!showEmoji) return

        
        document.addEventListener("mousedown",closeEmojiOutSideClick)
        return ()=>{
            document.removeEventListener("mousedown",closeEmojiOutSideClick)

        }

    },[showEmoji,closeEmojiOutSideClick])

  return (
    <div ref={closeEmoji} className=''>
      
     
        <Picker 
         
         data={data} 
         Theme='Light'
         
         onEmojiSelect={addEmoji}
        
        />
   
       
       
    </div>
  )
}
