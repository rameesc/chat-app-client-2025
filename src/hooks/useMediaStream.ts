
import { useStore } from "./useStore"
import { useSocket } from "./useSocket"

import { CandidateMessage } from "@/type/type"
import { useCallback, useEffect, useRef } from "react"


export const useGetMediaStrem=()=>{

    

    const getMediaStrem=async(faceMode?:string)=>{

      
    
        try{
         
    
          const devices =await navigator.mediaDevices.enumerateDevices()
          const videoDevices =devices.filter(device=>device.kind==="videoinput")
    
          const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{
              width:{min:640, ideal:1280,max:1920},
              height:{min:360,ideal:720,max:1080},
              frameRate:{min:16,ideal:30,max:30},
              facingMode:videoDevices.length > 0 ?faceMode : undefined
            }
          })
          
          
         
          return stream
    
    
        }catch(error){
          console.log('failed to get the stream',error)
          
           return null
        }
    
      }

   return getMediaStrem
    

}

//createPeerConnection

export const useCreatePeerConnection=()=>{

    const socket=useSocket()
    const {setRemoteStream,onGoingCall,setPeer}=useStore()
    const pcRef = useRef<RTCPeerConnection | null>(null);

    const configuration:RTCConfiguration={
      iceServers:[
        {urls:"stun:stun.1.google.com:19302"}
      ]
    }
    

   

    const createPeerConnection=useCallback(()=>{
      const pc = new RTCPeerConnection(configuration);
      pcRef.current=pc

      setPeer(pc)

      pc.onicecandidate=(event:RTCPeerConnectionIceEvent)=>{
        if(event.candidate && socket){
          socket.emit("candidate",{
            participants:onGoingCall?.participants,
            candidate:event.candidate
          }as CandidateMessage)
        }
        
      }
      pc.ontrack =(event:RTCTrackEvent)=>{
        if(event.streams && event?.streams[0]){
          setRemoteStream(event?.streams[0])

        }
        
      }

      pc.oniceconnectionstatechange=()=>{
        console.log('ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'disconnected' || 
          pc.iceConnectionState === 'failed') {
         // Handle disconnection
        }
      }

      return pc;

    },[socket,onGoingCall?.participants,setRemoteStream,setPeer])

    useEffect(()=>{

      return ()=>{
        if(pcRef.current){
          pcRef.current.close()
        }
      }

    },[])

    return createPeerConnection
}


//end call

export const useEndCall=()=>{

  const {setOnGoingCall,onGoingCall}=useStore()
  const socket=useSocket()

  const peer = useCreatePeerConnection()
  const {localStrem,remoteStream,setLocalStrem,setRemoteStream}=useStore()
    const endCall=async()=>{
     
       const pc= await peer()
       if(pc){
        pc.close()
       }

       if(localStrem){
        localStrem?.localStream?.getTracks().forEach((track)=>track.stop())
        setLocalStrem({
           isLocalStrem:false,
           isOnCall:false,
           localStream:null
        })
        
       }

       if(remoteStream){
        remoteStream.getTracks().forEach((track)=>track.stop())
        setRemoteStream(null)

       }

       if(socket){
          socket.emit("leave",onGoingCall?.participants)
       }

       if(onGoingCall?.participants){

        setOnGoingCall({
          participants:onGoingCall?.participants,
          isRinging:false
        })

       }
       

    }

    return endCall
}

