'use client'

import React, { useState } from 'react'
import { CustomInput, CustomInputProsp } from './CustomInput'
import {FieldValues} from "react-hook-form"
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

export const PasswordInput = <T extends FieldValues>({control,label,name,disabled,placeHolder}:CustomInputProsp<T>) => {

    const [showPassword,setShowPassword]=useState(false)
  return (
    <div className=' relative'>
         <CustomInput
            control={control}
            disabled={disabled}
            label={label}
            name={name}
            type={showPassword ?"text":"password"}
            placeHolder={placeHolder}
        
          />
          <div onClick={()=>setShowPassword((pre)=>!pre)} className=' absolute  top-[30px] right-[10px]'>
            {showPassword?<BiSolidShow/>:<BiSolidHide/>}
          </div>
    </div>
  )
}
