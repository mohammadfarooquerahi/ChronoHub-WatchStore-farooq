import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filters: {
      brands: [],
      type: "",
      maxPrice: 300000,
    },
    sortBy: "newest",
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setProducts, setFilters, setSortBy } = productSlice.actions;
export default productSlice.reducer;
