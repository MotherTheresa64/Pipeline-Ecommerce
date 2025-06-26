import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts, addProduct, updateProduct, deleteProduct, } from "../../features/products/productService";
// Async thunk to fetch all products from Firestore
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    return await getAllProducts();
});
// Async thunk to create a new product
export const createProduct = createAsyncThunk("products/create", async (product) => {
    await addProduct(product);
});
// Async thunk to edit an existing product by id
export const editProduct = createAsyncThunk("products/edit", async ({ id, data }) => {
    await updateProduct(id, data);
});
// Async thunk to delete a product by id
export const removeProduct = createAsyncThunk("products/delete", async (id) => {
    await deleteProduct(id);
});
// Initial state of the products slice
const initialState = {
    list: [],
    loading: false,
    error: null,
};
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}, // No synchronous reducers here, all handled by extraReducers
    extraReducers: (builder) => {
        builder
            // Handle fetchProducts lifecycle actions
            .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
            .addCase(fetchProducts.rejected, (state, action) => {
            state.error = action.error.message ?? "Failed to fetch products";
            state.loading = false;
        })
            // Handle createProduct lifecycle actions
            .addCase(createProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createProduct.fulfilled, (state) => {
            state.loading = false;
        })
            .addCase(createProduct.rejected, (state, action) => {
            state.error = action.error.message ?? "Failed to create product";
            state.loading = false;
        })
            // Handle editProduct lifecycle actions
            .addCase(editProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(editProduct.fulfilled, (state) => {
            state.loading = false;
        })
            .addCase(editProduct.rejected, (state, action) => {
            state.error = action.error.message ?? "Failed to edit product";
            state.loading = false;
        })
            // Handle removeProduct lifecycle actions
            .addCase(removeProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(removeProduct.fulfilled, (state) => {
            state.loading = false;
        })
            .addCase(removeProduct.rejected, (state, action) => {
            state.error = action.error.message ?? "Failed to delete product";
            state.loading = false;
        });
    },
});
export default productsSlice.reducer;
