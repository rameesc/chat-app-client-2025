
import {z} from "zod"


export const loginValidation=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const registerValidation=loginValidation.extend({

    userName:z.string().min(3),
    conformPassword:z.string().min(6)
    

}

).refine((data)=>data.password==data.conformPassword,{
    message:"password not match",
    path:['conformPassword']
}

)

export const forgetPasswordValidation=z.object({
    email:z.string().email()
})
export const resetPasswordValidation=z.object({
    password:z.string().min(6),
    conformPassword:z.string().min(6)

}).refine((data)=>data.password==data.conformPassword,{
    message:"password not match",
    path:['conformPassword']
})

export const uploadFileValidation=z.object({
    files:z.any().array()
})

export const uploadFile=z.object({
    file:z.any()
})
export const groupValidation=z.object({
    file:z.any(),
    name:z.string().min(3)
})