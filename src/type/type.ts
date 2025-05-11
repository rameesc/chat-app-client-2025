import React from "react"
import Peer from 'simple-peer'

export type ChildrenType={
    children:React.ReactNode
}

export type Files={
    file:File,
    url:string
}

export type UserType = {
    _id:string,
    userName:string,
    email:string,
    picture:string,
    password:string,
    emailVerififcationToken:string|null,
    emailVerififcation:boolean,
    resetPassword:string|null,
    status:"online"|"offline"|"away",
    lastSeen:string,
    contacts:string[],
    blockedUser:string[],
    createdAt:string
    updatedAt:string
    loginSystem:string


}


export type ConversationType={
    createdAt:string
    updatedAt:string
    _id:string
    lastMessage:MessageType
    
     groupName?:string
     groupPicture?:string
    messages:MessageType[]
    groupAdmin:string[]
    participants:UserType[],
    type:"private"|"group"
  


}
export type SingleConversationType=Pick<ConversationType,'_id'|'participants'|'type'|'groupName'|'groupPicture' >

export type ContectType="text"|"image"|"video"|"file"|"delete"|"audio"
export type SendMessageType={

    contect:string,
    contectType:"text",
    conversationId?:string

}

export type MessageType={
    contect:string,
    contectType:ContectType,
    conversation:ConversationType
    createdAt:string
    updatedAt:string
    deletedFor:string[]
    readBy:string[]
    sender:UserType
    _id:string

}

export type Message ={
    chatId:string,
    contact:string,
    sender:string,
    createAt:string,
    contectType:string
  }


  //concat list

export type UserData=Pick<UserType, '_id'|'userName'|'email'|'picture'>
export type ContactList ={
    message:string,
    status:boolean,
    contact:{
        _id:string,
        email:string,
        contacts:UserData[]
    }
}
export type BlocktList ={
    message:string,
    status:boolean,
    contact:{
        _id:string,
        email:string,
        blockedUser:UserData[]
    }
}

export type GroupUserList={
    userId:string,
    userName:string,
    
}

export type OnlienUser ={
    userId:string
    socketId:string
}

export type Participants={
    caller:OnlienUser
    receiver:OnlienUser
}

export type OngoingCall={
    participants:Participants,
    isRinging:boolean
}
export type LocalStreamType={
    localStream:MediaStream |null,
    isLocalStrem:boolean,
    isOnCall:boolean
}

export type PeerData={
    peerConnection:Peer.Instance,
    stream:MediaStream | null,
    participantUser:OnlienUser
}

//ansawer

export type AnswerMessage={
    participants:Participants
    answare:RTCSessionDescription
}
export type OfferMessage={
    participants:Participants
    offer:RTCSessionDescription
}
export type CandidateMessage={
    participants:Participants
    candidate:RTCIceCandidateInit
}