import { ChatAppItems } from '@/components/Chat/chatAppItem'
import { LoadingItems } from '@/components/loading/LoadingItems'

import React, { Suspense } from 'react'

const HomePage = () => {
 
  return (
    <div className='bg-[#aca1a1]  w-[100%] h-full '>
      <Suspense fallback={<LoadingItems/>}>
        <ChatAppItems/>
      </Suspense>
      
    </div>
  )
}

export default HomePage