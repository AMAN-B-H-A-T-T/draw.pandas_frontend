import React, { useEffect } from 'react'
import { Button, Checkbox, Label, Modal, TextInput, Table } from "flowbite-react";
import { MdGamepad } from "react-icons/md";
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setPlayerList } from '../redux/slices./gameSlice';

const Gamemodel = ({ openModal, setOpenModal,socket,setSocket,is_private_room_creator,set_is_private_room_creator}) => {
    const [Round_count, setRound_count] = useState(3)
    const data = useSelector(state => state.Game.game)
    const [gameData , setGameData ] = useState(data)
    const [playerLists , setPlayerLists ] = useState(useSelector(state => state.Game.playerList))
    const [round_count , set_round_count] = useState(3)
    const dispatch = useDispatch()
    useEffect(()=>{
        socket && socket.on('room_creation',(message)=>{
            setPlayerLists(message)
            dispatch(setPlayerList(message))
        })
    },[playerLists])

    useEffect(()=>{
        socket && socket.on('round_count',(message)=>{
            set_round_count(message)
        })
    },[round_count])
    const handleRoundchange = (rounds)=>{
    
        const data = {
            room_id : gameData.room_id,
            rounds : rounds
        }
         socket.emit('round_change',JSON.stringify(data))
    }
    return (
        <>
            <Modal show={openModal} popup>
                <Modal.Body>
                    <div className="space-y-6 py-6">
                        <h3 className="text-3xl font-medium text-gray-900 dark:text-white">Game Settings</h3>
                        <div>
                            <div className="mb-2 flex space-x-4 items-center">
                                <Label htmlFor="email" value="Total Rounds : " className='w-3/12 text-center text-lg' />
                                <div class="relative flex items-center max-w-[11rem]">
                                    <button type="button" id="decrement-button" data-input-counter-decrement="bedrooms-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" disabled = {is_private_room_creator ? false : true} onClick={(e)=>{e.preventDefault();round_count > 3 ? handleRoundchange(parseInt(round_count)-1) : null}}>
                                        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <input type="text" id="bedrooms-input" data-input-counter data-input-counter-min="1" data-input-counter-max="5" aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={round_count} onChange={(e) => {console.log("hello")}} min={3} max={5} required readOnly = { is_private_room_creator ? false : true}/>
                                    <div class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse"> 
                                    <MdGamepad />
                                        <span>Rounds</span>
                                    </div>
                                    <button type="button" id="increment-button" data-input-counter-increment="bedrooms-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" onClick={(e)=>{e.preventDefault();round_count < 5 ? handleRoundchange(parseInt(round_count)+1)  : null;}} disabled = {is_private_room_creator ? false : true}>
                                        <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex space-x-4 items-center">
                                <Label htmlFor="email" value="Room Name : " className='w-3/12 text-center text-lg' />
                                <Label htmlFor="email" value={gameData && gameData.room_id} className='w-3/12 text-lg text-blue-600' />
                            </div>
                        </div>
                        <div className='text-right'>
                            <div className="mb-5 block w-3/12 text-center">
                                <Label htmlFor="email" value="Player List : "  className='text-xl'/>
                            </div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Sr. No.</Table.HeadCell>
                                        <Table.HeadCell>Player Name</Table.HeadCell>
                                        <Table.HeadCell>Score</Table.HeadCell>
                                        
                                        
                                    </Table.Head>
                                    
                                    <Table.Body className="divide-y">
                                        {
                                            console.log(playerLists)
                                        }
                                    {
                                        playerLists && playerLists.map((player,index)=>{
                                            const data = JSON.parse(player)
                                            return (
                                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </Table.Cell>
                                            <Table.Cell>{data.player_name}</Table.Cell>
                                            <Table.Cell>{data.score}</Table.Cell>
                                            
                                        </Table.Row>    
                                            )
                                        })
                                    }
                                    </Table.Body>
                                </Table>
                            </div>

                        </div>
                        {
                            is_private_room_creator ? (<div className="w-full flex justify-end">
                                <Button onClick={(e) => { e.preventDefault(); setOpenModal(false) }}>Start Game</Button>
                                </div>) :(null)
                         }
                        
                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Gamemodel