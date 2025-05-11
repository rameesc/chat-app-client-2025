'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import { Form, FormField, FormItem } from '../ui/form'

import { LoadingButton } from '../Button/LoadingButton'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'

type SearchUserProsp={
  pathName?:string
}
export const SearchUser = ({pathName}:SearchUserProsp) => {

    const router=useRouter()

    const searchUserValidation=z.object({
        name:z.string()
    })

    const form=useForm<z.infer<typeof searchUserValidation>>({
        resolver:zodResolver(searchUserValidation)

    })

    const onSubmitHandler=(value:z.infer<typeof searchUserValidation>)=>{
        
         router.push(`${pathName}?search=${value.name}`)
       
    }


  return (
    <div  className='mt-3'>
        <Form {...form}>
            <form className='flex gap-3 ' onSubmit={form.handleSubmit(onSubmitHandler)}>

                
                 <FormField
                  control={form.control}
                  name='name'
                  render={({field})=>(
                    <FormItem>
                        <Input 
                         {...field} 
                          placeholder='Search UserName or Email'
                          className=''
                        />
                    </FormItem>
                  )}
                 
                 />
                <LoadingButton
                  title='Search'
                  type='submit'
                  
                />
                
            </form>
        </Form>

    </div>
  )
}
