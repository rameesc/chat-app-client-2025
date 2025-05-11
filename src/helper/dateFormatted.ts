import { format,isValid,parseISO ,isToday,isYesterday} from "date-fns"



export const dateFormatted=(date:string)=>{

   if(!date) return 'N/A';
   const parsedDate= typeof date=='string' ? parseISO(date) :date
   if(!isValid(parsedDate)) return 'Invalid Date'

   return format(date,"dd-MM-yyyy")
}

export const timeDateFromatted=(date:string)=>{
   if(!date) return 'N/A';
   const parsedDate= typeof date=='string' ? parseISO(date) :date
    if(!isValid(parsedDate)) return 'Invalid Date'

   // tody
   if(isToday(date)){

      const house =format(date ,"hh")
      const minute =format(date ,"m")
      const amOrPm =format(date ,"aaa")

      return `${house}:${minute} ${amOrPm}`

   }

   //is yesterDay

   if(isYesterday(date)){
      return 'Yesterday'
   }

   return format(date,"dd-MM-yyyy")

}

export const timeFormatted=(date:string)=>{
   if(!date) return 'N/A';
   const house =format(date ,"hh")
   const minute =format(date ,"m")
   const amOrPm =format(date ,"aaa")

   return `${house}:${minute} ${amOrPm}`
   

}