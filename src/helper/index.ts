import { S3BUCKET_IMG_URL } from "@/config"
import toast from "react-hot-toast"



export const contactLenght=(contect:string,length:number)=>{
    if(contect?.length >=length){
        return `${contect.substring(0,length)}...`
    }
    return contect

}
//it me or not

export const itMeUser=(authUserId:string,userId:string):boolean=>{

    if(authUserId==userId){
        return true
    }else{
        return false
    }


}

//copy message

export const copyToClickBoad=async(text:string)=>{

    try{
        await navigator.clipboard.writeText(text)
        toast.success('Copied')

    }catch(err){
        toast.error('Failed to copy')
        console.error(err)

    }
}

export const isAdminOrNot=(adminArray:string[],authUserId:string)=>{

   return adminArray.includes(authUserId)

}
export const isSelectedGroupMembers=(adminArray:string[],userId:string)=>{

   return adminArray.includes(userId)

}

//is aws bucket image or google image check it

export const isBucketImageOrNot=(imageUrl:string)=>{

    const domainName=imageUrl?.split('/')[2]


  if(process.env.NEXT_PUBLIC_GOOGLE_IMG_DOMAIN==domainName){
    return imageUrl
  }else{
   return `${S3BUCKET_IMG_URL}/${imageUrl}`
  }

}