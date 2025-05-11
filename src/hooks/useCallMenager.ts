import { useCallback } from "react"
import { useCreatePeerConnection, useGetMediaStrem } from "./useMediaStream"
import { useSocket } from "./useSocket"
import { useStore } from "./useStore"
import toast from "react-hot-toast"




export const useCallManager=()=>{

    const socket=useSocket()
    const {onGoingCall,setLocalStrem}=useStore()

    const createPeerConnection=useCreatePeerConnection();
    const getMediaStream =useGetMediaStrem()

    const startCall=useCallback(async()=>{
        if(!socket || !onGoingCall?.participants) return;

        try{
            const pc=createPeerConnection();
            const stream = await getMediaStream();

            if(!stream){
                return toast.error('could not access media devicess')
            }

             //set local stream in state
             setLocalStrem({
                localStream:stream,
                isLocalStrem:true,
                isOnCall:false
             })

             // Add tracks to peer connection
             stream.getTracks().forEach(track => {
               pc.addTrack(track, stream);
             });

             // Create and set local offer
             const offer = await pc.createOffer();
             await pc.setLocalDescription(offer);
             
             //send offer through signaling

             socket.emit("call-offer", {
                participants: onGoingCall.participants,
                offer: pc.localDescription
              });


        }catch(error){
            console.error("call initiation failed",error)

        }
    },[socket ,onGoingCall , getMediaStream ,setLocalStrem,createPeerConnection])


    const answerCall = useCallback(async () => {
        if (!socket || !onGoingCall?.participants) return;
    
        try {
          const pc = createPeerConnection();
          const stream = await getMediaStream();
    
          if (!stream) {
              return toast.error("Could not access media devices")
          }
    
          // Set local stream in state
          setLocalStrem({
            localStream: stream,
            isLocalStrem:true,
            isOnCall: true
          });
    
          // Add tracks to peer connection
          stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
          });
    
          // Create and set local answer
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
    
          // Send answer through signaling
          socket.emit('answer-call', {
            participants: onGoingCall.participants,
            answer: pc.localDescription
          });
    
        } catch (error) {
          console.error('Call answering failed:', error);
          // Handle error state
        }
      }, [socket, onGoingCall, createPeerConnection, getMediaStream, setLocalStrem]);

      const endCall = useCallback(() => {
        // Clean up peer connection and streams
        // Implement your end call logic here
      }, []);

      return { startCall, answerCall, endCall };

}