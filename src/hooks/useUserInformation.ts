
import {useSession} from 'next-auth/react'

export const useUserInformation=()=>{
    const {data,status}=useSession()

    const user=data?.user
    if(!user) return

    return {user,status}

}