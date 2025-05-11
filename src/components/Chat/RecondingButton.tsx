'use client'

import React from 'react'
import { Button } from '../ui/button'
import { FaMicrophone } from 'react-icons/fa'
import clsx from 'clsx'

export const RecondingButton = () => {

    
  return (
            
    <div>
        <div className={clsx('hidden')}>
           <Button
            
               className='cursor-pointer hover:scale-[1.2]'
              
               type='button'>
              <FaMicrophone/>
            </Button>
        </div>
        <div className={clsx('')}>
            <Button>
                
            </Button>

        </div>
    </div>
  )
}
