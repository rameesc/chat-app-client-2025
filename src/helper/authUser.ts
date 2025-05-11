import { fetchData } from "@/config"



export const getUserWithEmail=async(email:string)=>{

    try{

        const {data}=await fetchData.post('/auth/get-user',{email})

        if(data?.status){

            return data?.user


        }else{
            return null
        }


    }catch(error:unknown){

        if(error instanceof Error){

            console.error(error?.message)
        }
    }
}
export const loginWithGoogle=async(email:string,image:string,name:string)=>{

    console.log(email,image,name,10000)

    try{

        const {data}=await fetchData.post('/auth/login-with-google',
            {
                email,
                image,
                name
            }
        )

        if(data?.status){

            return data


        }else{
            return data
        }


    }catch(error:unknown){

        if(error instanceof Error){

            console.error(error?.message)
        }
    }
}