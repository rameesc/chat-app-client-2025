'use client'


import Link from 'next/link'
import React from 'react'

type AuthCardItemType={
    title:string,
    link:string,
    children:React.ReactNode,
    linkText:string
    linkDescription:string
}

const AuthCardItem = ({title,link,children,linkText,linkDescription}:AuthCardItemType) => {
  return (
    <div className='p-5 m-5 bg-v-white space-y-2 rounded-md'>
        <div>
            <h1 className="text-[27px]">{title}</h1>
        </div>
        <div>
            {children}
        </div>
        <div>
            <p className='flex gap-1 text-sm  lowercase'>
                {linkDescription}
                <Link className='text-blue-600 underline' href={link}>{linkText}</Link>
            </p>
        </div>


    </div>
  )
}

export default AuthCardItem