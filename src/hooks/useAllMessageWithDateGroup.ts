
import { dateFormatted } from "@/helper/dateFormatted";
import { MessageType } from "@/type/type";
import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useStore } from "./useStore";




export const useAllMesssageWithDateGroup=(message:MessageType[])=>{
    const socket=useSocket()
    const {selectChat}=useStore()

    const grouped: { [date: string]: { message: MessageType }[] } = {};
   

    useEffect(()=>{
        if(!socket ||!selectChat) return
        socket.emit('join_room',selectChat)
        const handleNewMessage=(message:MessageType)=>{
            const heading=dateFormatted(message?.createdAt)
           if(!grouped[heading]) grouped[heading]=[]
           grouped[heading].push({message:message})

        }

        socket.on("recieved_message",handleNewMessage)

        return ()=>{
           
            socket.off('recieved_message',handleNewMessage)
           
          
          }

    },[socket,selectChat])

    message.forEach((mes)=>{
        const heading=dateFormatted(mes?.createdAt)
        if(!grouped[heading]) grouped[heading]=[]
        grouped[heading].push({message:mes})
    })

    return grouped

}