import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../features/components/weatherSlice";


export const store = configureStore ({
    reducer:{
        weather: weatherSlice
    }

})