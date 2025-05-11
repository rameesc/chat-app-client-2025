'use client'

import React from 'react'

type DataNotFound={
  title?:string,
  img?:string
}

export const DataNotFound = ({title}:DataNotFound) => {
  return (
    <div>
      <p className='text-v-grayText'>{title}</p>
    </div>
  )
}
