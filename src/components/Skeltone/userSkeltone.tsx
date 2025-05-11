'use client'

import React from 'react'
import { Skeleton } from '../ui/skeleton'

export const UserSkeltone = () => {
  return (
  
         <div className="flex items-center space-x-4">
           <Skeleton className="h-12 w-12 rounded-full" />
           <div className="space-y-2">
            <Skeleton className="h-4 w-[100%] lg:w-[250px]" />
           <Skeleton className="h-4 w-[100%] lg:w-[200px]" />
           </div>
         </div>
        
  )
}
