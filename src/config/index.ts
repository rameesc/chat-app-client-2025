
import axios from 'axios'
import { getSession } from 'next-auth/react'

export const BASA_URL="https://iamramees.com/api"
export const S3BUCKET_IMG_URL="https://56u6u6.s3.us-east-1.amazonaws.com"

export const fetchData=axios.create({
    baseURL:BASA_URL
})
export const authAxios=axios.create({
    baseURL:BASA_URL
})


//accessToken

authAxios.interceptors.request.use(async(config)=>{

    const session =await getSession()
    
    if(!config.headers["x-auth-uesr"]){
        config.headers["x-auth-uesr"]= session?.user.accessToken

    }

    return config
},
(error)=>Promise.reject(error)
)

//refresh token