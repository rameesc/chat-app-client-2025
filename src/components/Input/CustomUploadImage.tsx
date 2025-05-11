'use client'

import React from 'react'
import {useFormContext, Controller} from 'react-hook-form'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FormMessage } from '../ui/form'
import toast from 'react-hot-toast'
import { useStore } from '@/hooks/useStore'

type UploadImagesProsp={
    name:string
    children:React.ReactNode
}

export const CustomUploadImage = ({name,children}:UploadImagesProsp) => {

    const {control,setValue}=useFormContext()
    const {setEditeImage,setScale,setPosition,setOpenEditingSystem}=useStore()

   const uploadImageHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
       
    const file=e.target.files?.[0]

    if(!file){
      return  toast.error("image is required")
    }

    const reader = new FileReader();

    console.log(reader,'readers')
    reader.onload=()=>{
        setEditeImage(reader.result as string)
        setScale(1)
        setPosition({x:0,y:0})
        
    }
    reader.readAsDataURL(file)

    setValue(name,file)

    setOpenEditingSystem(true)

    }
  return (
    <div>
        <Controller
           name={name}
           control={control}
           render={({field})=>(
            <Label 
             htmlFor={name}
             className='flex flex-col'
             >
                <div>
                 {children}
                </div>
              

                <Input 
                 type='file' 
                 accept='image'
                 hidden
                 id={name}
                 onChange={(e)=>{
                    uploadImageHandler(e)
                    field.onChange(e.target.files?.[0])
                 }}
                />
                <FormMessage/>
            </Label>
           )}
        
        />
    </div>
  )
}
