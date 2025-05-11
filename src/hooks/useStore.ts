import { Files, GroupUserList,OnlienUser, OngoingCall, LocalStreamType } from '@/type/type'
import { create } from 'zustand'

type CretaeZustandProsp={
    files:Files[],
    setFiles:(file:Files[])=>void,
    setDeleteFile:(url:string)=>void

    //emoji
    showEmoji:boolean,
    emojiMessage:string,
    setEmojiMessage:(m:string)=>void,
    setShowEmoji:(item:boolean)=>void,

    //search
    openSearchBar:boolean,
    setSearchBar:(item:boolean)=>void

    //select chat
    selectChat:string,
    setSelectChat:(item:string)=>void

    //chat page,
    currentPage:number,
    setCurrentPage:(page:number)=>void

    //typing
    typingUser:string|null,
    setTypingUser:(user:string|null)=>void


    //popap
    showPopap:boolean,
    setShowPopap:(item:boolean)=>void

    //upload profile
    uploadProfile:boolean,
    setUploadProfile:(item:boolean)=>void

    //delete message
    deleteMessage:boolean,
    setDeleteMessage:(item:boolean)=>void,
    messageDeleteId:string|null,
    setMessageDeleteId:(item:string|null)=>void

    //selected user to create a group
    selectedUser:GroupUserList[]
    setSeletedUser:(userData:GroupUserList)=>void,
    setRemoveSelectedUser:(userId:string)=>void
    moveToNextSession:boolean
    setMoveToNext:(next:boolean)=>void


    //edit image
    editeImage:string,
    setEditeImage:(item:string)=>void,
    scale:number,
    setScale:(item:number)=>void,
    position:{
      x:number,
      y:number
    },
    setPosition:({x,y}:{x:number,y:number})=>void,
    isDragging:boolean,
    setIsDragging:(itme:boolean)=>void,
    dragStart:{
      x:number,
      y:number
    },
    setDragStart:({x,y}:{x:number,y:number})=>void,
    openEditeSystem:boolean,
    setOpenEditingSystem:(item:boolean)=>void,
    finalEditingImage:File|null,
    setFinalEditingImage:(item:File)=>void

    //vocie message
    reconding:boolean,
    setReconding:(item:boolean)=>void


    //thiUser
    thisUser:string,
    setThisUser:(item:string)=>void

    //onlien user
    onlineUserList:OnlienUser[]
   
    setOnlienUesr:(onlien:OnlienUser[])=>void

    //onGoing call
    onGoingCall:OngoingCall|null,
    setOnGoingCall:(item:OngoingCall)=>void
    
    //LOCAL STREAM
    localStrem:LocalStreamType,
    setLocalStrem:(item:LocalStreamType)=>void,

    //remote stream
    remoteStream:MediaStream | null,
    setRemoteStream:(item:MediaStream | null)=>void,

    //peer
    peer:RTCPeerConnection|null,
    setPeer:(item:RTCPeerConnection | null)=>void

}

export const useStore=create<CretaeZustandProsp>((set)=>({

    //files
    files:[],
    setFiles:(file)=>set({files:file}),
    setDeleteFile:(url)=>set((state)=>({
      files:state.files.filter((file)=>file.url!==url)
    })),

    //emoji
    showEmoji:false,
    emojiMessage:'',
    setEmojiMessage:(m)=>set({emojiMessage:m}),
    setShowEmoji:(item)=>set({showEmoji:item}),

    //search Bar
    openSearchBar:false,
    setSearchBar:(item)=>set({openSearchBar:item}),

    //select chat

    selectChat:'',
    setSelectChat:(s)=>set({selectChat:s}),

    //chat page
    currentPage:1,
    setCurrentPage:(n)=>set({currentPage:n}),

    //typing
    typingUser:null,
    setTypingUser:(type)=>set({typingUser:type}),

    //show popap
    showPopap:false,
    setShowPopap:(item)=>set({showPopap:item}),


    //upload profile
    uploadProfile:false,
    setUploadProfile:(item)=>set({uploadProfile:item}),

    //delete message
    deleteMessage:false,
    setDeleteMessage:(item)=>set({deleteMessage:item}),

    messageDeleteId:null,
    setMessageDeleteId:(item)=>set({messageDeleteId:item}),

    //select user to group
    selectedUser:[],
    
    setSeletedUser:(userData)=>set((state)=>{
      const existUser=state.selectedUser.some((user)=>user?.userId==userData?.userId)
      const fiterUserData=state.selectedUser.filter((user)=>user?.userId!==userData?.userId)
      if(existUser){
      return {selectedUser:fiterUserData}

      }
    
     return {selectedUser:[...state.selectedUser,userData]}
    
    }),

    setRemoveSelectedUser:(userId)=>set((state)=>{
      const fiterUserData=state.selectedUser.filter((user)=>user?.userId!==userId)
     return {selectedUser:fiterUserData}
    }),

    moveToNextSession:false,
    setMoveToNext:(next)=>set({moveToNextSession:next}),


    //edit image
    editeImage:'',

    setEditeImage:(item)=>set({editeImage:item}),

    scale:0,

    setScale:(item)=>set({scale:item}),

    position:{
      x:0,
      y:0
    },
    setPosition:({x,y})=>set(
      {position:{
        x:x,
        y:y}
      }
    ),
    isDragging:false,
    setIsDragging:(itme)=>set({isDragging:itme}),
    dragStart:{
      x:0,
      y:0
    },
    setDragStart:({x,y})=>set(
      {dragStart:{
        x:x,
        y:y
      }}
    ),

    openEditeSystem:false,
    setOpenEditingSystem:(item)=>set({openEditeSystem:item}),

    finalEditingImage:null,
    setFinalEditingImage:(item)=>set({finalEditingImage:item}),

    //vocie message

    reconding:false,
    setReconding:(item)=>set({reconding:item}),

    //thisuser
    thisUser:'',
    setThisUser:(item)=>set({thisUser:item}),

    //onlien user
    onlineUserList:[],
   
    setOnlienUesr:(onlien)=>set({onlineUserList:onlien}),

    //on going call
    onGoingCall:null,
    setOnGoingCall:(item)=>set({onGoingCall:item}),

    //local stream
    localStrem:{
      isLocalStrem:false,
      isOnCall:false,
      localStream:null
    },
    setLocalStrem:(item)=>set({localStrem:item}),

    //peer
    peer:null,
    setPeer:(item)=>set({peer:item}),

    //REMOTE STREAM

    remoteStream: null,
    setRemoteStream:(item)=>set({remoteStream:item})
    




}))