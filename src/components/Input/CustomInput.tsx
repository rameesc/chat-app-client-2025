'use client'

import React from 'react'
import {  FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import {Control,FieldValues,Path} from "react-hook-form"
import { Input } from '../ui/input'

export type CustomInputProsp<T extends FieldValues>={
    label:string,
    name:Path<T>,
    type?:string|number,
    placeHolder?:string,
    control:Control<T>,
    disabled?:boolean
}
export const CustomInput =<T extends FieldValues>({control,disabled,label,name,placeHolder,type}:CustomInputProsp<T>) => {
  return (
    <FormField
            control={control}
            disabled={disabled}
            name={name}
            render={({field})=>(
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <Input {...field} placeholder={placeHolder} type={`${type}`}/>
                <FormMessage/>

              </FormItem>
            )}
          
          />
  )
}
