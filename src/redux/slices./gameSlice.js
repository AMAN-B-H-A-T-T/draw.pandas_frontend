import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    game : null,
    player : null,
    playerList : null,
    TotalPlayer : 0
}
const gameSlice = createSlice({
    name: 'Game',
    initialState,
    reducers : {
        gameAdd(state,action){
            return {
                ... state,
                game : action.payload
            }
        },
        gameDelete(state,action){
            return {
                ... state,
                game : {}
            }
        },
        setPlayer(state,action){
            return {
                ...state,
                player : action.payload
            }
        },
        resetPlayer(state,action){
            return {
                ...state,
                player : null
            }
        },
        setPlayerList(state,action){
            return {
                ... state,
                playerList : action.payload
            }
        },
        resetPlayerList(state,action){
            return {
                ... state,
                playerList : null
            }
        },
        updateRounds(state,action){
            return {
                ...state,
                ...game,
                round : action.payload
            }
        },
        updatePlayerCount(state,action){
            return {
                ...state,
                TotalPlayer : TotalPlayer + 1
            }
        }
    }
})

export const {gameAdd,gameDelete,setPlayer,resetPlayer,setPlayerList,resetPlayerList,UpdateRounds,updatePlayerCount} = gameSlice.actions

export default gameSlice.reducer