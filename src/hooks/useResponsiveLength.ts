import { useEffect, useState } from "react"




export const useResponsiveLength=(defaultLength:number,screenLength:number,breakPoit:number)=>{


    const [length,setLength]=useState(defaultLength)


    useEffect(()=>{

        const updateLength=()=>{
            if(window.innerWidth <= breakPoit){

                setLength(screenLength)
            }else{
                setLength(defaultLength)
            }
           

        }

        updateLength()


        window.addEventListener("resize",updateLength)

        return ()=>window.removeEventListener("resize",updateLength)

    },[screenLength,breakPoit,defaultLength])



    return length

}