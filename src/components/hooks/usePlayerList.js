import { useSelector } from "react-redux"

const usePlayerList = ()=>{
    const data = useSelector(state => state.Game.playerList)
    return data
}

export default usePlayerList