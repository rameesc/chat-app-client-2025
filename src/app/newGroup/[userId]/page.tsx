
import React, { Suspense } from 'react'
import { CreateNewGroupItem } from '../components/CreateNewGroupItem'
import { LoadingItems } from '@/components/loading/LoadingItems'
import { Metadata } from 'next'


export const metadata: Metadata={
  title:"Create group",
  description:"create new group and add your friends and family"
}

const CreateNewGroupPage = () => {
  return (
    <div className='w-full  h-full flex flex-col  items-center '>
      <Suspense fallback={<LoadingItems/>}>
       <CreateNewGroupItem/>
      </Suspense>
      
       
    </div>
  )
}

export default CreateNewGroupPage