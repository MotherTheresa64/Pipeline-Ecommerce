import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productReducer from '../features/products/productSlice';
import orderReducer from '../pages/orders/orderSlice';

// Configure the Redux store by combining multiple slice reducers.
// Each slice manages a specific part of the global state.
export const store = configureStore({
  reducer: {
    cart: cartReducer,       // State and logic related to the shopping cart
    products: productReducer, // State and logic related to product listings
    orders: orderReducer,     // State and logic related to orders
  },
});

// RootState represents the entire Redux state object type inferred from the store.
// Useful for type checking in selectors and useSelector hooks.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type represents the dispatch function type from the store.
// Useful for typing the dispatch function in useDispatch hooks or thunk actions.
export type AppDispatch = typeof store.dispatch;
