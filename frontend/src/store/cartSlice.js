import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    uniqueCount: 0,
    totalQuantity: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
        state.uniqueCount += 1;
        state.totalQuantity += action.payload.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        const quantityDifference = quantity - item.quantity;
        item.quantity = quantity;
        state.totalQuantity += quantityDifference;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        state.items = state.items.filter(item => item.id !== id);
        state.uniqueCount -= 1;
        state.totalQuantity -= item.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.uniqueCount = 0;
      state.totalQuantity = 0;
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;