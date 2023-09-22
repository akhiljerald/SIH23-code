import { configureStore  } from "@reduxjs/toolkit";
import navReducer from './slices/navSlice';
export const store=configureStore({
  reducer: {
    //stores origin and destination 
    nav: navReducer,
  },
})