import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices./gameSlice";

const Store = configureStore({
    reducer : {
        Game : gameSlice
    }
})

export default Store