import { useEffect, useState } from "react"

import {io,Socket} from "socket.io-client"


export const useSocket=()=>{
    const [socket,setSocket]=useState<Socket|null>(null)

    useEffect(()=>{
         
        const newSocket:Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL||'https://iamramees.com',{
            withCredentials:true,
            transports:["websocket"],
            
          })
    
          setSocket(newSocket)
        return ()=>{
            newSocket.disconnect()            
         }
    },[])
   
    return socket
     
}