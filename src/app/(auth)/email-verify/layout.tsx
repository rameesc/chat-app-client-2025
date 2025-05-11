

import { LoadingItems } from '@/components/loading/LoadingItems'
import { ChildrenType } from '@/type/type'
import React, { Suspense } from 'react'

 const EmailVerificationLayout = ({children}:ChildrenType) => {
  return (
    <div>
       <Suspense fallback={<LoadingItems/>}>
        {children}
      </Suspense>
      
    </div>
  )
}

export default EmailVerificationLayout