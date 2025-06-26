import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../types";
import { createOrder, getOrdersByUser, getOrderById } from "./orderService";

// 🔁 Async thunk to fetch all orders for a specific user
export const fetchOrders = createAsyncThunk<Order[], string>(
  "orders/fetchOrders",
  async (userId: string) => {
    return await getOrdersByUser(userId);
  }
);

// Async thunk to fetch a single order by its ID
export const fetchOrderById = createAsyncThunk<Order | null, string>(
  "orders/fetchById",
  async (id: string) => {
    return await getOrderById(id);
  }
);

// Async thunk to submit/create a new order
export const submitOrder = createAsyncThunk<void, Omit<Order, "id">>(
  "orders/create",
  async (orderData) => {
    await createOrder(orderData);
  }
);

// 🧾 State interface describing orders slice state
interface OrdersState {
  list: Order[];             // List of all orders for the user
  selectedOrder: Order | null; // Currently viewed order details
  loading: boolean;          // Loading status for async operations
}

// Initial state with empty order list and no selected order
const initialState: OrdersState = {
  list: [],
  selectedOrder: null,
  loading: false,
};

// 🧩 Redux slice managing orders state and async thunks lifecycle
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {}, // No synchronous reducers needed currently
  extraReducers: (builder) => {
    builder
      // Handle fetchOrders lifecycle actions
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })

      // Handle fetchOrderById fulfilled to update selectedOrder
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      });
  },
});

export default orderSlice.reducer;
