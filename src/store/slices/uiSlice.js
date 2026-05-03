import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartOpen: false, searchQuery: "" },
  reducers: {
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    setSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { toggleCart, setSearch } = uiSlice.actions;
export default uiSlice.reducer;
