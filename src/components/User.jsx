import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { baseUrl, socketUrl } from '../utils/baseUrl';
import { gameAdd} from '../redux/slices./gameSlice';
import { useDispatch } from 'react-redux'
import io from 'socket.io-client';
import Logo from './Logo';
import Drawingarea from './Drawingarea';

const User = () => {
    const type = ["fun-emoji", "big-ears", "micah", "avataaars-neutral", "open-peeps", "bottts", "miniavs", "initials", "personas", "croodles", "pixel-art"]
    const [avtarType, setavtarType] = useState(0)
    const [imgUrl, setimgUrl] = useState(`https://api.dicebear.com/8.x/${type[avtarType]}/svg?seed=`)
    const [userName, setuserName] = useState("")
    const [userCreated, setUserCreated] = useState(false)
    const [socket , setSocket] = useState(null)
    const [is_private_room_creator, set_is_private_room_creator] = useState(false)
    const dispatch = useDispatch()
    // useform hook handl
    const {
        register,
        handleSubmit
    } = useForm()

    const createNewGame = (data, event) => {
        const btn = event.nativeEvent.submitter
        if (btn.name === "play") {
            const roomId = handleRoomCreation()
            data.room_id = roomId
            data.is_private_room_creator = false
        }
        else if (btn.name === "create-room") {
            data.is_private_room_creator = true
        }
        data.player_profile_image = imgUrl
        data.score = 0
        axios({
            method: 'post',
            url: baseUrl + "/api/manage/create-player",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        })
            .then((response) => {
                dispatch((gameAdd(response.data.data)))
                const socket = io(`${socketUrl}/game/${response.data.data._id}`)
                setSocket(socket)
                if (btn.name == 'create-room') {
                    set_is_private_room_creator(true)
                    socket.emit('createRoom', response.data.data.room_id)
                }
                else if (btn.name == "play") {
                    set_is_private_room_creator(false)
                    socket.emit('joinRoom', response.data.data.room_id)
                }
                setUserCreated(true)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handelUserAvtar = (userName) => {
        setimgUrl(`https://api.dicebear.com/8.x/fun-emoji/svg?seed=${userName}`)
    }
    const handelLeftArrow = () => {
        if (avtarType > 0) {
            setavtarType(avtarType - 1)
            setimgUrl(`https://api.dicebear.com/8.x/${type[avtarType]}/svg?seed=${userName}`)
        }
    }
    const handelRightArrow = () => {
        if (avtarType < 11) {
            setavtarType(avtarType + 1)
            setimgUrl(`https://api.dicebear.com/8.x/${type[avtarType]}/svg?seed=${userName}`)
        }
    }

    const handleRoomCreation = () => {
        return (prompt("enter the room Id"))
    }
    return (
        
        (!userCreated ? <div className='w-full bg-blue-600 h-screen flex flex-col items-center'>
            <Logo></Logo>
            <div className='w-full flex justify-center h-full mt-20'>
                <div className='w-full md:w-3/12 h-fit flex  flex-col px-3 py-3 mx-3 sm:mx-0 bg-opacity-50' style={{ backgroundColor: "rgba(12, 44, 150, 0.75)" }}>
                    <form onSubmit={handleSubmit(createNewGame)}>
                        <div className='user-input w-full mb-3'>
                            <div className='flex w-full'>
                                <input type="text" placeholder='enter your name...' className='h-12 text-lg w-full border-none outline-none rounded px-1' {...register("player_name")} onChange={(e) => { setuserName(e.target.value) }}></input>
                            </div>
                        </div>
                        <div className='avtar w-full flex items-center mb-3 justify-center'>
                            <div className='up h-fit text-center'>
                                <button className='bg-green-500 hover:bg-green-400 text-white font-bold mx-3 border-b-4 border-green-700 hover:boder-blue-500 rounded' type='button' onClick={() => { handelLeftArrow() }}><GoTriangleLeft size={45} color='white' /></button>
                            </div>
                            <div className='h-full text-center flex justify-center'>
                                <img src={imgUrl} width={150} height={150}></img>
                            </div>
                            <div className='up h-fit'>
                                <button className='bg-green-500 hover:bg-green-400 text-white font-bold mx-3 border-b-4 border-green-700 hover:boder-green-500 rounded' type='button' onClick={() => { handelRightArrow() }}><GoTriangleRight size={45} color='white' /></button>
                            </div>
                        </div>
                        <div className='w-full mb-3'>
                            <button className='w-full text-center bg-blue-500 border-blue-300 hover:bg-opacity-70 text-white font-bold py-2 px-4 border-b-4 hover:boder-green-500 rounded text-3xl' type='submit' name='play'>Play !</button>
                        </div>
                        <div className='w-full'>
                            <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 border-b-4 border-green-700 hover:boder-green-500 rounded w-full' name='create-room'>crete private room</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> : socket && <Drawingarea socket={socket} setSocket={setSocket} is_private_room_creator={is_private_room_creator} set_is_private_room_creator={set_is_private_room_creator}></Drawingarea>)
        
        
    )
}

export default User