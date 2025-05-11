'use clien'

import React from 'react'
import { Button } from '../ui/button'
import { LoadingSpinner } from '../LoadingSpinner'
import clsx from 'clsx'

type IconButtonProsp={
    icon?:React.JSX.Element
    title?:string,
    action:()=>void,
    disabled?:boolean,
    style?:string,
    type:'submit'|"button"|"reset"

}
export const IconButton = ({action,disabled,icon,style,type}:IconButtonProsp) => {
  return (
    <div>
        <Button 
         onClick={action} 
         disabled={disabled}
         type={type}
         className={clsx('',
            style && style
         )}
        >
           {!disabled ?(
            
                <span>{icon}</span>
          
           ):(
            <LoadingSpinner
               color='white'
               size={20}
             />
           )} 
            


        </Button>
    </div>
  )
}
