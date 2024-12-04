import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cartItems')) || [],
    total: JSON.parse(localStorage.getItem('cartTotal')) || 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total += parseFloat(item.price.replace('$', ''));
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      localStorage.setItem('cartTotal', JSON.stringify(state.total));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find(item => item.id === itemId);
      if (itemToRemove) {
        state.total -= parseFloat(itemToRemove.price.replace('$', '')) * itemToRemove.quantity;
        state.items = state.items.filter(item => item.id !== itemId);
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        localStorage.setItem('cartTotal', JSON.stringify(state.total));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotal');
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
