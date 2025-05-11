import { LoadingItems } from '@/components/loading/LoadingItems'
import { ChildrenType } from '@/type/type'
import React, { Suspense } from 'react'

const AuthLayout = ({children}:ChildrenType) => {
  return (
    <div className='bg-[url(/assets/images/bg-chat.jpg)] w-screen h-dvh'>
         <Suspense fallback={<LoadingItems/>}>
           {children}
         </Suspense>
    </div>
  )
}

export default AuthLayout