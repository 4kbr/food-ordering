import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type IRootState = ReturnType<typeof rootReducer>;
