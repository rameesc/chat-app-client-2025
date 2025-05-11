'use client'

import { Button } from '@/components/ui/button';
import { useStore } from '@/hooks/useStore';
import clsx from 'clsx';

import React, { useRef, useState } from 'react'

import { SiTicktick } from "react-icons/si";
export const ImageEditing = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [cropSize] = useState(150); // Default circle size

    const {
        editeImage,
        
        scale,
        setScale,
        position,
        setIsDragging,
        isDragging,
        setDragStart,
        dragStart,
        setPosition,
        setOpenEditingSystem,
        setFinalEditingImage
        
    }=useStore()

   
    //handle zoom with mouse wheel

    const handleWheel=(e:React.WheelEvent)=>{
        e.preventDefault()

        const delta=e.deltaY > 0 ? 0.9 :1.1;
        const newScale= Math.max(0.1,Math.min(scale * delta,5))

        
       

        setScale(newScale)
    }

    //handle drag start
    const handleMouseDown=(e:React.MouseEvent)=>{
        if(!editeImage) return
        
        setIsDragging(true)
        setDragStart({
            x:e.clientX-position.x,
            y:e.clientY-position.y 
        })

    }

    //handle  dragging

    const handleMouseMove=(e:React.MouseEvent)=>{
        if(!isDragging||!editeImage) return;
          
        setPosition({
            x:e.clientX -dragStart.x,
            y:e.clientY -dragStart.y
        });

        

    }

    //handler drag end
    const handlerMouseUp=()=>{
        setIsDragging(false)
    }


    //handle upload of edited image

    const handleUpload=async()=>{
        if(!editeImage|| !containerRef.current||!imageRef.current) return

        //create a canvas to draw the edited image
        const canvas = document.createElement("canvas")
        canvas.width = cropSize;
        canvas.height = cropSize;
        const ctx= canvas.getContext("2d")
         
    if (!ctx) return;

    // Calculate center position of the container
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // Calculate the visible area based on zoom and position
    const img:HTMLImageElement = new Image();
     img.src = editeImage;

    await new Promise<void>((resolve) => {
      img.onload = ()=>resolve;
    });

    // Calculate the source rectangle (what's visible in the square)
    const sourceX = (centerX - cropSize/2 - position.x) / scale;
    const sourceY = (centerY - cropSize/2 - position.y) / scale;
    const sourceWidth = cropSize / scale;
    const sourceHeight = cropSize / scale;

    // Draw just the square portion
    ctx.drawImage(
      img,
      sourceX, sourceY,       // Source x, y
      sourceWidth, sourceHeight, // Source width, height
      0, 0,                   // Destination x, y
      cropSize, cropSize      // Destination width, height
    );
        // Convert canvas to blob and then to file
         canvas.toBlob((blob) => {
        if (blob) {
         const editedFile = new File([blob], 'edited-image.png', { type: 'image/png' });
          setOpenEditingSystem(false)
           console.log(editedFile,30000)
           setFinalEditingImage(editedFile)
        }
       }, 'image/png');
    }

  return (
    <div className='flex flex-col gap-1 fixed top-0 left-0 h-full w-full bg-[#0e0c0c7e]'>
        <div className='w-[90%] lg:w-[550px] lg:h-[500px] absolute top-[40%] left-[50%] translate-[-50%] translate-x-[-50%] p-5 bg-[#f0eded] rounded-md flex flex-col gap-2'>
            <div className='flex justify-between'>
                <p className='font-bold text-[20px]' >Drag and Adjust The Image</p>
                <div 
                 onClick={()=>setOpenEditingSystem(false)}
                 className='cursor-pointer text-red-600 hover:bg-red-500 hover:text-white w-[30px] h-[30px] flex justify-center rounded-full items-center' >

                   <p className='font-bold'>x</p>
                </div>
            </div>
         <div 
           ref={containerRef} 
           onWheel={handleWheel}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handlerMouseUp}
           className='w-[100%] h-[200px] lg:w-[500px] lg:h-[300px] relative  bg-v-editeBg overflow-hidden flex justify-center items-center'
           style={{ cursor: isDragging ? 'grabbing' : editeImage ? 'grab' : 'default' }}
           >
            
            {editeImage && (
                <img
                  ref={imageRef}
                  src={editeImage}
                  className={clsx(' absolute w-[90%] lg:max-w-none',
                  
                  
                  )}
                  alt='img'
                  style={{
                    transform :`translate(${position.x}px, ${position.y}px) scale(${scale})`,
                   
                  }}
                  
                />
            )}


            
           
              <div  className='w-[150px] h-[150px]   z-[10] border-2 border-white rounded-full  absolute flex flex-col'>
               
               </div>

        </div>
        
        
        <div className='flex justify-between'>
            <div>
             <Button
              className='bg-v-editeBg rounded-none font-bold cursor-pointer  border-r-1 border-white text-[20px]'  
              onClick={()=>setScale(Math.max(0.1,scale-0.1))}
             >-</Button>
           
             <Button
              className='bg-v-editeBg rounded-none font-bold cursor-pointer  text-[20px]'  
              onClick={()=>setScale(Math.min(5,scale+0.1))}
             >+</Button>

            </div>

            <div 
             onClick={handleUpload}
             className='w-[50px] h-[50px] flex flex-col hover:scale-[1.1] hover:bg-green-700 justify-center items-center text-white bg-green-600 rounded-full'>

              <SiTicktick
               size={25}
              />
            </div>
            

        </div>
      </div>
    </div>
  )
}
