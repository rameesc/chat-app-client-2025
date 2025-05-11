import { MessageType } from "@/type/type";
import { dateFormatted } from "./dateFormatted";



export const allMesssageWithDateGroup=(message:MessageType[])=>{

    const grouped: { [date: string]: { message: MessageType }[] } = {};
    message.forEach((mes)=>{
        const heading=dateFormatted(mes?.createdAt)
        if(!grouped[heading]) grouped[heading]=[]
        grouped[heading].push({message:mes})
    })

    return grouped

}