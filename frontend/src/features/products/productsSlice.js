import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: nanoid(),
      name: "Sample Product",
      stock: 100,
      price: 50,
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ ...action.payload, id: nanoid() });
    },
    updateProduct: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedData };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
