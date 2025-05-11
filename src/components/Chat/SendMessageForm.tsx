'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import {  useForm } from 'react-hook-form'
import { z} from "zod"

import { Form, FormField } from '../ui/form'
import { Input } from '../ui/input'

import { FaMicrophone } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import { Button } from '../ui/button'

import { useStore } from '@/hooks/useStore'
import { useQuerySendMessage } from '@/hooks/useQueryMessage'
import { useSocket } from '@/hooks/useSocket'

import { useUserInformation } from '@/hooks/useUserInformation'


export const SendMessageForm = () => {
  
    const {isPending,mutate}=useQuerySendMessage()

    const socket =useSocket()
    const user=useUserInformation()

    const {emojiMessage,setEmojiMessage,selectChat,setReconding}=useStore()
    const  messageValidation=z.object({
        message:z.string()
    })

    const form=useForm<z.infer<typeof messageValidation>>({
        resolver:zodResolver(messageValidation),
        defaultValues:({
            message:''
        
        })

    })


    const onSubmitHandler=(values:z.infer<typeof messageValidation>)=>{

      if(!socket ||!selectChat) return
       
       
        // const newMessage:Message={
        //   chatId:selectChat,
        //   contact:values?.message,
        //   sender:user?.user?.id as string,
        //   createAt:new Date().toISOString(),
        //   contectType:'type'

        // }
       
    
        
        mutate({contect:values?.message,contectType:"text"})
        setEmojiMessage('')

        form.reset({message:''})
    }
      
 
    useEffect(()=>{

        form.setValue('message',form.getValues('message')+emojiMessage)

    },[emojiMessage,form])

    useEffect(()=>{
      if(form.watch('message').length>0){

        socket?.emit('typing',{chatId:selectChat,user:user?.user?.id as string})

      }else{
        socket?.emit('stop_typing',{chatId:selectChat,user:user?.user?.id as string})

      }
      
      
    },[form.watch('message'),selectChat])
    
  return (
    <Form {...form}>
        <form 
      
         className='flex gap-2 '
         onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FormField
             disabled={isPending}
             control={form.control}
             name='message'
             render={({field})=>(
              
                     <Input 
                
                       {...field} 
                       placeholder='Type a Message'
                      className='border-2 border-v-borderColor '
                     />
                   
               
               
             )}
            />
            
           {form.watch("message").length>0?(
            <Button 
             disabled={isPending}
             className='cursor-pointer hover:scale-[1.2]'
             type='submit'>
             <MdSend/>
           </Button>

           ):(
            <Button
             onClick={()=>setReconding(true)}
             
             className='cursor-pointer hover:scale-[1.2]'
           
             type='button'>
             <FaMicrophone/>
            </Button>
            
           )} 
           
       
           
        </form>
    </Form>
  )
}
