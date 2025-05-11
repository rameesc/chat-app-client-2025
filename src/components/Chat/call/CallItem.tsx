'use client'

import { useStore } from '@/hooks/useStore'
import React from 'react'
import { CallContaciner } from './CallContaciner'

export const CallItem = () => {
    const {localStrem,onGoingCall,remoteStream}=useStore()

    const isOnCall =localStrem && remoteStream && onGoingCall ?true :false

    console.log(remoteStream,'peer2')
    console.log(localStrem?.localStream,'local')
  return (
    <div>
       
        {localStrem?.localStream &&(
            <CallContaciner
              stream={localStrem?.localStream}
              isLocalStreem={localStrem?.isLocalStrem}
              isOnCall={isOnCall}
            />
        )}
        {remoteStream &&(
            <CallContaciner
              stream={remoteStream}
              isLocalStreem={false}
              isOnCall={isOnCall}
            />
        )}
    </div>
  )
}
