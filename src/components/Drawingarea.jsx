import React, { useEffect, useRef, useState } from 'react'
import Whiteboard from './Whiteboard'
import Scoreboard from './Scoreboard'
import { IoMdSettings } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { Button } from "flowbite-react";
import Gamemodel from './Gamemodel';
import { useSelector, useDispatch } from 'react-redux';
import WordOptionModal from './WordOptionModal';
import usePlayerList from './hooks/usePlayerList';
import Canvas from './Canvas';
import { useForm } from 'react-hook-form';
import { setPlayerList } from '../redux/slices./gameSlice';



const Drawingarea = ({ socket, setSocket, is_private_room_creator, set_is_private_room_creator }) => {
    //select from the global store
    const player_details = useSelector(state => state.Game.player)
    const dispatch = useDispatch()
    //ref
    // const canvasRef = useRef(null)
    const canvasRef = useRef(null);
    const ctx = useRef(null);
    const imgRef = useRef(null);
    const [color, setColor] = useState("#000000");
    const [tool, setTool] = useState("pencil");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const time = useRef(null)
    const chat = useRef(null)

    //useState
    const [scoreboard, setscoreboard] = useState(false)
    const [openModal, setOpenModal] = useState(true);
    const [player_pointer, set_player_pointer] = useState(-1)
    const [openWordModal, setopenWordModal] = useState(false)
    const [word, set_word] = useState(null)
    const [round_dtl, set_round_dtl] = useState(null)
    const [is_player_turn, set_is_player_turn] = useState(false)
    const [playerLists , setPlayerLists ] = useState(null)
    const [player_turn,set_player_turn] = useState(null)
    //custom hook
    const gameData = useSelector(state => state.Game.game)
    let setTimeOut = null;

    const {
        register,
        handleSubmit
    } = useForm()


    useEffect(()=>{
        socket && socket.on('room_creation',(message)=>{
            setPlayerLists(message)
            dispatch(setPlayerList(message))   
        })
        socket && socket.on('start_game_response', (message) => {
            setOpenModal(false)
            const data = JSON.parse(message)
            set_round_dtl(data.round_count)
            set_player_pointer(data.player_ptr)
            set_player_turn(data.turn_details)
            console.log(data)
            handlePlayerTurn(data.turn_details)
            
        })
        socket && socket.on('word_selection_response', (message) => {
            const data = JSON.parse(message)
            setopenWordModal(false)
            set_word(data)
            start_timmer()
        })
        socket && socket.on('canvas_data_response', (message) => {
            if(is_player_turn == false){
                load_canvas(message)
            }
        })
        socket && socket.on('room_chat',(message)=>{
            let data = JSON.parse(message)
             handelChat(data)
        })
        socket && socket.on("turns",(message)=>{
            
             handlePlayerTurn(parseInt(message),playerLists)
        })
        console.log("first")
    },[])

    const handlePlayerTurn = (player) => {
        try {
            player = JSON.parse(player)
            if (player_details._id == player._id) {
                set_is_player_turn(true)
                setopenWordModal(true)
                socket.emit("get_drawable_objects", gameData.room_id)
            }
            else {
                set_is_player_turn(false)
                setopenWordModal(true)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    const start_timmer = () => {
        let time_limit = 60
        const time_div = time.current
        const intervalRef = setInterval(() => {

            time_div.innerHTML = "Time Left : " + time_limit
            time_limit -= 1
            if (time_limit < 0) {
                time_limit = 60
                clearInterval(intervalRef)
                time_div.innerHTML = "Time : " + time_limit
                finish_time_limit()
            }
        }, 1000);
    }

    const finish_time_limit = () => {
        clearChat()
        // if(is_player_turn) clearCanvas()
        set_is_player_turn(!is_player_turn)
        // console.log(playerLists)
        const len = playerLists && playerLists.length
        console.log(playerLists)
        // if((player_pointer + 1) % len == len){
        //     set_round_dtl(round_dtl - 1)
        // }
        // set_player_pointer((player_pointer + 1) % len)
        // const data = {
        //     player_pointer : (player_pointer + 1) % len ,
        //     room_id : gameData.room_id
        // }
        // socket.emit("turns",JSON.stringify(data))
    }

    const load_canvas = (data) => {
        imgRef.current.src = data;
    }

   const handelChat = (message) =>{
    const parentDiv = chat.current
    const new_dive = document.createElement('div')
    new_dive.className = 'w-full flex items-center';
    if(message.chat.chat === message.word.word_name){
        new_dive.innerHTML = `<img src="${message.player.player_profile_image}" className='rounded-full w-7 h-7 mx-2 my-2'></img>
        <div className='w-full flex flex-col items-center'>
          <span className='w-full text-sm text-gray-400'>${message.player.player_name}</span>
          <div className='w-full flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 text-lime-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <span className='w-full text-sm text-lime-500 font-semibold px-1'>successfully guessed word..!</span>
          </div>
        </div>`
        // handelScore();
    }
    else{
        new_dive.innerHTML = `<img src="${message.player.player_profile_image}" className="rounded-full w-7 h-7 mx-2 my-2">
        <div className="w-full flex flex-col items-center">
            <span className="w-full text-sm text-gray-400">${message.player.player_name}</span>
            <span className="w-full text-sm">${message.chat.chat}</span>
            
        </div>`
    }
    
        parentDiv.appendChild(new_dive)
   }
   const clearChat = ()=>{
        const parentDiv = chat.current
        parentDiv.innerHTML = ''
   }


   const handelScore = ()=>{
    const timer = time.current.textContent
    const time = parseInt(timer.split(':')[1].trim())
    let score = 0;
    if(time >= 51 && time <= 60){
        score = 200
    }
    else if(time >= 41 && time <= 50){
        score = 100
    }
    else if(time >= 31 && time <= 40){
        score  = 50
    }
    else if(time >= 21 && time <= 30){
        score = 30
    }
    else if(time >= 11 && time <= 20){
        score = 20
    }
    else{
        score = 10
    }

    const data =  {
        player_id : player_details._id,
        room_id : gameData.room_id,
        score : score
    }
    socket.emit('update_score',JSON.stringify(data))
   }
   const submitChat = (data)=>{
    const message = {
        room_id : gameData.room_id,
        player : player_details,
        chat : data,
        word : word
    }
    socket.emit('room_chat',JSON.stringify(message))
    // handelChat(message)

   }
    const redo = () => {
        setElements((prevElements) => [
            ...prevElements,
            history[history.length - 1],
        ]);
        setHistory((prevHistory) =>
            prevHistory.filter((ele, index) => index !== history.length - 1)
        );
    };

    const undo = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1],
        ]);
        setElements((prevElements) =>
            prevElements.filter((ele, index) => index !== elements.length - 1)
        );
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setElements([]);
    };
    return (
        <>
            <div className='w-full h-screen  px-3 py-4 box-border' style={{ backgroundColor: "#2563eb" }}>
                <div className='w-full h-full'>
                    <div className='w-full flex flex-col h-full flex-wrap space-y-3'>
                        <div className='w-full bg-white'>
                            <div className='w-full flex justify-between px-4 items-center py-3'>
                                <div className='text-center flex flex-col'>
                                    <span className='text-3xl' ref={time}>Time : 60</span>
                                    {round_dtl && <span className='text-2xl mx-3'> Round : {round_dtl} <sup>th</sup> </span>}
                                </div>
                                <div className='text-3xl text-center'>
                                    {
                                        is_player_turn ? (<span className='px-1'>{word && word.word_name}</span>) : (

                                            word && Array.from(word.word_name).map((char, index) => (
                                                <span className='px-1' key={index}>_</span>
                                            ))
                                        )
                                    }

                                    <p className='text-xl mt-1'>Total : {word && word.word_name.length}</p>
                                </div>
                                <div className='text-2xl'>
                                    <div className='flex space-x-4 items-center'>
                                        <Button color="blue" onClick={(e) => { e.preventDefault(); setOpenModal(true) }}><IoMdSettings size={34} color='white' /></Button>
                                        <Button color="success" onClick={(e) => { e.preventDefault(); setscoreboard(true) }}><FaRankingStar size={34} color='white' /></Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='w-full flex-1 overflow-hidden'>
                            <Scoreboard scoreboard={scoreboard} setscoreboard={setscoreboard}></Scoreboard>

                            <div className='w-full flex h-full space-x-2'>
                                <div className='w-9/12 pb-6  pt-3 px-3 bg-white'>
                                    <div className="w-full flex justify-around bg-white border border-black px-2 py-2 items-center">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="tools"
                                                id="pencil"
                                                value="pencil"
                                                checked={tool === "pencil"}
                                                onClick={(e) => setTool(e.target.value)}
                                                readOnly={true}
                                            />
                                            <label className="form-check-label" htmlFor="pencil">
                                                Pencil
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="tools"
                                                id="line"
                                                value="line"
                                                checked={tool === "line"}
                                                onClick={(e) => setTool(e.target.value)}
                                                readOnly={true}
                                            />
                                            <label className="form-check-label" htmlFor="line">
                                                Line
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="tools"
                                                id="rect"
                                                value="rect"
                                                checked={tool === "rect"}
                                                onClick={(e) => setTool(e.target.value)}
                                                readOnly={true}
                                            />
                                            <label className="form-check-label" htmlFor="rect">
                                                Rectangle
                                            </label>
                                        </div>
                                        <Button
                                            type="button"
                                            color="warning"
                                            disabled={elements.length === 0}
                                            onClick={() => undo()}
                                        >
                                            Undo
                                        </Button>
                                        <Button
                                            type="button"
                                            color="purple"
                                            disabled={history.length < 1}
                                            onClick={() => redo()}
                                        >
                                            Redo
                                        </Button>
                                        <div className="color-picker d-flex align-items-center justify-content-center">
                                            <Button color="failure" onClick={clearCanvas}>
                                            clear canvas
                                            </Button>
                                        </div>
                                    </div>
                                    {is_player_turn && <Canvas canvasRef={canvasRef}
                                        ctx={ctx}
                                        color={color}
                                        setElements={setElements}
                                        elements={elements}
                                        tool={tool}
                                        socket={socket}></Canvas>}

                                    {
                                        !is_player_turn && <div
                                            className="col-md-8 overflow-hidden border border-dark px-0 mx-auto
                                        mt-3 h-96"
                                            
                                        >
                                            {!is_player_turn && <img className={`w-100 ${is_player_turn ? "hidden" : "block"} h-100`}  ref={imgRef} src="" alt="image" />}
                                        </div>
                                    }
                                    {/* <Whiteboard selectionRef={selectionRef} canvasRef={canvasRef} sketchRef={sketchRef} clearCanvas={clearCanvas} ></Whiteboard> */}
                                </div>
                                <div className='w-3/12 h-full px-2 pb-6'>
                                    <div className='w-full flex flex-col h-full bg-white'>
                                        <div className='w-full h-full overflow-y-scroll mb-3' style={{ overflow: "-webkit-scrollbar" }}>
                                            <div className='w-full flex flex-col justify-end h-full' ref={chat}>
                                                <div className='w-full flex items-center'>
                                                    <img src={player_details.player_profile_image} className='rounded-full w-7 h-7 mx-2 my-2'></img>
                                                    <div className='w-full flex flex-col items-center'>
                                                    <span className='w-full text-sm text-gray-400'>{player_details.player_name}</span>
                                                    <span className='w-full text-sm '>ksfsfdsfd</span>
                                                    </div>
                                                </div>
                                                <div className='w-full flex items-center'>
                                                    <img src={player_details.player_profile_image} className='rounded-full w-7 h-7 mx-2 my-2'></img>
                                                    <div className='w-full flex flex-col items-center'>
                                                    <span className='w-full text-sm text-gray-400'>{player_details.player_name}</span>
                                                    <div className='w-full flex items-center'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" w-4 text-lime-500 bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                                                    <span className='w-full  text-sm  font-semibold px-1'>Chat Here</span>
                                                    </div>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <form className='w-full flex space-x-2 px-2 py-2' onSubmit={handleSubmit(submitChat)}>
                                                <input type='text' className='w-10/12 outline-none border-2 border-black px-2' placeholder='Type here ....' readOnly={is_player_turn} {...register("chat")}></input>
                                                <button type='submit' className='px-4 py-2 bg-green-800 text-white rounded-md' disabled={is_player_turn}>send</button>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Gamemodel openModal={openModal} setOpenModal={setOpenModal} setSocket={setSocket} socket={socket} is_private_room_creator={is_private_room_creator} set_is_private_room_creator={set_is_private_room_creator} playerLists={playerLists}></Gamemodel>
                {player_turn && <WordOptionModal openWordModal={openWordModal} setOpenWordModal={setopenWordModal} socket={socket} set_word={set_word} start_timmer={start_timmer}  player={player_turn} is_player_turn={is_player_turn}></WordOptionModal>}
            </div>

            
        </>
    )
}

export default Drawingarea