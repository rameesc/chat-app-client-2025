import { useEffect, useState } from "react"

import {io,Socket} from "socket.io-client"


export const useSocket=()=>{
    const [socket,setSocket]=useState<Socket|null>(null)

    useEffect(()=>{
         
        const newSocket:Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL||'http://localhost:3001',{
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