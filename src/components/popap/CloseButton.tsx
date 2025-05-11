'use client'

import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


type TooltipItemProsp={
    action:()=>void,
    children:React.ReactNode,
    tooltipTitle:string
}
export const TooltipItem = ({action,children,tooltipTitle}:TooltipItemProsp) => {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger onClick={action} asChild>
          {children}
      </TooltipTrigger>
      <TooltipContent>
        {tooltipTitle}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}



