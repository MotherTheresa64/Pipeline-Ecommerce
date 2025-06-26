import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrdersByUser, getOrderById } from "./orderService";
// 🔁 Async thunk to fetch all orders for a specific user
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (userId) => {
    return await getOrdersByUser(userId);
});
// Async thunk to fetch a single order by its ID
export const fetchOrderById = createAsyncThunk("orders/fetchById", async (id) => {
    return await getOrderById(id);
});
// Async thunk to submit/create a new order
export const submitOrder = createAsyncThunk("orders/create", async (orderData) => {
    await createOrder(orderData);
});
// Initial state with empty order list and no selected order
const initialState = {
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
