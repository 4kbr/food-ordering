import { ProductModel } from "@/models/ProductModel";
import { createSlice } from "@reduxjs/toolkit";

type Data = {
  products: ProductModel[];
  total: number;
};
const initialState: Data = {
  products: [],
  total: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state = cartSlice.getInitialState();
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
