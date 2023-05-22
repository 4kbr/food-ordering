import { ProductChild } from "@/models/ProductModel";
import { createSlice } from "@reduxjs/toolkit";

export type Cart = {
  products: ProductChild[];
  total: number;
  quantity: number;
};
const initialState: Cart = {
  products: [],
  total: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state = cartSlice.getInitialState();
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
