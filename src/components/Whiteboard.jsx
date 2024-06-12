import React, { useRef } from 'react'

const Whiteboard = ({canvasRef,selectionRef,sketchRef,clearCanvas}) => {  
  return (
    <>
    <div className='w-full h-full bg-white px-2 py-2'>
      <div className='w-full flex h-full flex-col'>
        <div className='w-full h-full' ref={sketchRef}>
            <canvas className='w-full h-full border-2 border-black' ref={canvasRef}></canvas>
        </div>
        <div className='w-full text-center px-2 pb-1 pt-1'>
        <button className='border px-8 py-2 bg-red-600 text-white rounded-md' onClick={(e)=>{e.preventDefault();clearCanvas()}}>clear</button>
      </div>
      </div>
      
      
    </div>
    
    {/* <div className="group h-full" id='sketch' ref={sketchRef}>
      <canvas
        className="w-full  bg-black"
        ref={canvasRef}
      ></canvas>
       
      <div className="hidden absolute h-full inset-0 bg-black bg-opacity-75  items-center justify-center opacity-0 transition-opacity duration-300" ref={selectionRef}>
        <div className='w-full flex flex-col'>
          <div className='w-full'>
              <p className='w-full text-center text-white text-2xl'>Hover text</p>
          </div>        
          <div className='flex space-x-3 justify-center my-4'>
              <button className='bg-transparent border-2 border-white shadow-md px-7 py-4 text-white'>option 1</button>
              <button className='bg-transparent border-2 border-white shadow-md px-7 py-4 text-white'>option 1</button>
              <button className='bg-transparent border-2 border-white shadow-md px-7 py-4 text-white'>option 1</button>
          </div>
        </div>
      </div>
    </div>
    <div className='w-full my-2 text-center'>
          <button className='border px-8 py-2 bg-red-600 text-white rounded-md' onClick={(e)=>{e.preventDefault();clearCanvas()}}>clear</button>
        </div> */}
    </>
  )
}

export default Whiteboard