import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((pizza) => pizza.pizzaId === action.payload);
      item.quantity--;

      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  clearCart,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((prev, curr) => prev + curr.totalPrice, 0);

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((prev, curr) => prev + curr.quantity, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((pizza) => pizza.pizzaId === id)?.quantity ?? 0;
