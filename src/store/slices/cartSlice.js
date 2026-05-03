import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQty: 0, totalPrice: 0 },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      state.totalQty += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.totalQty -= item.qty;
        state.totalPrice -= item.price * item.qty;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQty = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
