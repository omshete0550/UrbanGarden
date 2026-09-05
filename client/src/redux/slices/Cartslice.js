import { createSlice } from "@reduxjs/toolkit";

const updateCartTotals = (state) => {
  state.quantity = state.products.reduce(
    (quantity, product) => quantity + (Number(product.quantity) || 0),
    0
  );
  state.total = state.products.reduce(
    (total, product) =>
      total + (Number(product.price) || 0) * (Number(product.quantity) || 0),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => String(item._id) === String(product._id)
      );

      if (existingProduct) {
        existingProduct.quantity += Number(product.quantity) || 1;
      } else {
        state.products.push({ ...product, quantity: Number(product.quantity) || 1 });
      }

      updateCartTotals(state);
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find(
        (item) => String(item._id) === String(productId)
      );

      if (product) {
        product.quantity = Math.max(1, Number(quantity) || 1);
        updateCartTotals(state);
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => String(product._id) !== String(productId)
      );
      updateCartTotals(state);
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, updateProductQuantity, removeProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
