import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Label, Modal, TextInput, Table } from "flowbite-react";
import { useSelector } from 'react-redux';

const WordOptionModal = ({ openWordModal, setOpenWordModal, socket, set_word, start_timmer, handleDrawingChoiceSelection, is_player_turn,player }) => {
    // useselector hook 

    const gameDate = useSelector(state => state.Game.game)
    const [word_list, set_word_list] = useState(null)
    useEffect(() => {
        socket && socket.on('drawable_object_response', (message) => {
            set_word_list(JSON.parse(message))
        })
    }, [word_list])

    const handelWordSelection = (words) => {
        // handleDrawingChoiceSelection();
        const data = {
            word_details : words,
            room_id : gameDate.room_id
        }
        socket.emit('word_selection', JSON.stringify(data))

    }
    return (
        <>
            <Modal show={openWordModal} popup className='bg-transparent'>
                <Modal.Body>
                    <div className="space-y-6 py-6">
                        <h3 className="text-3xl font-medium text-gray-900 dark:text-white text-center">{is_player_turn ? "Select Word" : ""}</h3>
                        <div className='w-full flex justify-around'>
                            {
                                is_player_turn ? word_list && word_list.map((word,index)=>(
                                    <Button
                                        key={index}
                                        onClick={() => handelWordSelection(word)}
                                    >
                                        {word.word_name} 
                                    </Button>
                                )) : (<span className='w-full text-center text-xl'>{player && JSON.parse(player).player_name} is selecting word......</span>)
                            }
                        </div>
                        <Button onClick={() => { setOpenWordModal(false) }}>close</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WordOptionModal