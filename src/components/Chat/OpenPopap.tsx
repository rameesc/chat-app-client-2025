'use client'


import clsx from 'clsx'
import React from 'react'

type UploadFilesProsp={
    opne:boolean,
    children:React.ReactNode
}
export const OpenPopap = ({opne,children}:UploadFilesProsp) => {
  return (
    <div className={clsx('fixed top-[0px] left-0 w-[100%] h-full bg-[#0f0a0a71]',
        opne?'visible':'invisible'
    )}>
        <div className={clsx(' bg-white absolute translate-[-50%] p-3',
          opne ?'top-[50%] left-[50%]  visible duration-400':'top-[50%] left-[50%]  w-[20px] h-[20px] invisible '
        )}>
          {children}
        </div>
    </div>
  )
}
