import React, { useEffect, useRef, useState } from 'react'
import Whiteboard from './Whiteboard'
import Scoreboard from './Scoreboard'
import { IoMdSettings } from "react-icons/io";
import { FaRankingStar } from "react-icons/fa6";
import { Button } from "flowbite-react";
import Gamemodel from './Gamemodel';
import { useSelector } from 'react-redux';


const Drawingarea = ({socket,setSocket,is_private_room_creator,set_is_private_room_creator}) => {
    const [scoreboard, setscoreboard] = useState(false)
    const canvasRef = useRef(null)
    const selectionRef = useRef(null)
    const sketchRef = useRef(null)
    let setTimeOut = undefined;
    const [openModal, setOpenModal] = useState(true);
    const [turn , set_turn] = useState(true)
    
    useEffect(()=>{
        turn && handleDrawingChoiceSelection();
    },[])

    const handleDrawingChoiceSelection = () => {
        var canvas = canvasRef.current
    var ctx = canvas.getContext('2d');

    var sketch = sketchRef.current
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        var rect = canvas.getBoundingClientRect();
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }, false);

    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
        clearTimeout(setTimeOut);
            setTimeOut = setTimeout(() => {
                const base64 = canvas.toDataURL("image/png");
                console.log(base64); // Logging base64 data
            }, 1000);
    };
        // var canvas = canvasRef.current;
        // var ctx = canvas.getContext('2d');
    
        // var sketch = sketchRef.current;
        // var sketch_style = getComputedStyle(sketch);
        // canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        // canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
        // var mouse = { x: 0, y: 0 };
        // var last_mouse = { x: 0, y: 0 };
        // let setTimeOut;
    
        // /* Mouse and Touch Capturing Work */
        // const updateMousePosition = (e) => {
        //     last_mouse.x = mouse.x;
        //     last_mouse.y = mouse.y;
    
        //     const rect = canvas.getBoundingClientRect();
        //     mouse.x = (e.clientX || e.touches[0].clientX) - rect.left;
        //     mouse.y = (e.clientY || e.touches[0].clientY) - rect.top;
        // };
    
        // /* Drawing on Paint App */
        // ctx.lineWidth = 5;
        // ctx.lineJoin = 'round';
        // ctx.lineCap = 'round';
        // ctx.strokeStyle = 'blue';
    
        // const startPainting = (e) => {
        //     updateMousePosition(e);
        //     canvas.addEventListener('mousemove', onPaint, false);
        //     canvas.addEventListener('touchmove', onPaint, false);
        // };
    
        // const endPainting = () => {
        //     canvas.removeEventListener('mousemove', onPaint, false);
        //     canvas.removeEventListener('touchmove', onPaint, false);
        // };
    
        // var onPaint = function() {
        //     ctx.beginPath();
        //     ctx.moveTo(last_mouse.x, last_mouse.y);
        //     ctx.lineTo(mouse.x, mouse.y);
        //     ctx.closePath();
        //     ctx.stroke();
        //     clearTimeout(setTimeOut);
        //     setTimeOut = setTimeout(() => {
        //         const base64 = canvas.toDataURL("image/png");
        //         console.log(base64); // Logging base64 data
        //     }, 1000);
        // };
    
        // /* Event Listeners */
        // canvas.addEventListener('mousemove', updateMousePosition, false);
        // canvas.addEventListener('touchmove', updateMousePosition, false);
    
        // canvas.addEventListener('mousedown', startPainting, false);
        // canvas.addEventListener('touchstart', startPainting, false);
    
        // canvas.addEventListener('mouseup', endPainting, false);
        // canvas.addEventListener('touchend', endPainting, false);
    };
    
    const clearCanvas = ()=>
    {
        var canvas = canvasRef.current
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  return (
    <>
        <div className='w-full h-screen  px-3 py-4 box-border' style={{backgroundColor:"#2563eb"}}>
            <div className='w-full h-full'>
                <div className='w-full flex flex-col h-full flex-wrap space-y-3'>
                    <div className='w-full bg-white'>
                        <div className='w-full flex justify-between px-4 items-center py-3'>
                            <div className='text-center'>
                                <span className='text-3xl'>Time : 60</span>
                            </div>
                            <div className='text-3xl text-center'>
                                <span className='px-1'>_</span>
                                <span className='px-1'>_</span>
                                <span className='px-1'>_</span>
                                <span className='px-1'>_</span>
                                <span className='px-1'>_</span>
                                <span className='px-1'>_</span>
                                <p className='text-xl mt-1'>Total : 6</p>
                            </div>
                            <div className='text-2xl'>
                                <div className='flex space-x-4 items-center'>
                                <Button color="blue" onClick={(e) => {e.preventDefault();setOpenModal(true)}}><IoMdSettings size={34} color='white'/></Button>
                                <Button color="success" onClick={(e)=>{e.preventDefault();setscoreboard(true)}}><FaRankingStar size={34} color='white'/></Button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex-1 overflow-hidden'>
                    <Scoreboard scoreboard={scoreboard} setscoreboard={setscoreboard}></Scoreboard>
                    
                        <div className='w-full flex h-full space-x-2'>
                            <div className='w-9/12 pb-6'>
                                <Whiteboard selectionRef={selectionRef} canvasRef={canvasRef} sketchRef={sketchRef} clearCanvas={clearCanvas} ></Whiteboard>
                            </div>
                            <div className='w-3/12 h-full px-2 pb-6'>
                            <div className='w-full flex flex-col h-full bg-white'>
                                <div className='w-full h-full overflow-y-scroll mb-3' style={{overflow:"-webkit-scrollbar"}}></div>
                                <div className='w-full'>
                                    <div className='w-full flex space-x-2 px-2 py-2'>
                                        <input type='text' className='w-10/12 outline-none border-2 border-black px-2' placeholder='Type here ....'></input>
                                        <button className='px-4 py-2 bg-green-800 text-white rounded-md'>send</button>
                                    </div>
                                </div>
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Gamemodel openModal={openModal} setOpenModal={setOpenModal} setSocket={setSocket} socket={socket} is_private_room_creator={is_private_room_creator} set_is_private_room_creator={set_is_private_room_creator}></Gamemodel>
        </div>

        {/* <div className='h-screen box-border overflow-hidden'>
        <div className='w-full px-3 h-full py-4 overflow-hidden'>
            <div className='w-full border flex justify-between items-center flex-wrap px-4 rounded-md'>
                <div>
                    <span className='text-2xl text-center'>Time: </span>
                    <span className='text-2xl text-center'>60</span>
                </div>
                <div className='text-center'>
                        <span className='text-xl'>_</span>
                        <span className='text-xl'>_</span>
                        <span className='text-xl'>_</span>
                        <span className='text-xl'>_</span>
                        <span className='text-xl'>_</span>
                        <p className='text-xl'>Letters: 5</p>
                </div>
                <div class="text-center">
   <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example" onClick={(e)=>{e.preventDefault();setscoreboard(true)}}>
   Scoreboard
   </button>
                </div>
            </div>
            <div className='w-full sm:h-96 flex flex-wrap justify-center space-x-3 my-5'>
            <Scoreboard scoreboard={scoreboard} setscoreboard={setscoreboard}></Scoreboard>
                <div className='sm:w-8/12  w-full sm:h-96 h-fit border'>
                    <Whiteboard selectionRef={selectionRef} canvasRef={canvasRef} sketchRef={sketchRef} clearCanvas={clearCanvas} ></Whiteboard>
                </div>
                <div className='sm:w-3/12 w-full border'>
                    <div className='w-full h-full flex flex-col justify-end'>
                        <div className='w-full overflow-hidden overflow-y-scroll px-3 h-full'>
                             write the code to enter the list of conversiotion in this div
                        </div>
                        <div className='w-full mt-1 px-1 py-1'>
                        <input type='text' className='relative bottom-0 w-full border py-2 px-1 outline-none rounded-md' placeholder='enter message....'></input>
                        <button className="absolute py-2 sm:right-20 right-10">click</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </div> */}
        
    </>
  )
}

export default Drawingarea