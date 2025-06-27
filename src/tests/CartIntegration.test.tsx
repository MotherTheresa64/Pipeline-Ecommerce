// ✅ Place this mock FIRST, top of the file
vi.mock("../context/AuthContext", async () => {
  const React = await import("react");
  return {
    useAuthContext: () => ({ user: { email: "test@example.com", uid: "abc123" } }),
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productSlice";
import ProductList from "../features/products/ProductList";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

// Mock product
const mockProduct = {
  id: "1",
  title: "Mock Product",
  description: "Mock Description",
  price: 19.99,
  image: "https://via.placeholder.com/150",
  category: "Mock Category",
};

// Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: {
    products: {
      list: [mockProduct],
      loading: false,
      error: null,
    },
    cart: {
      items: [],
    },
  },
});

describe("Cart Integration", () => {
  it("adds item to cart when button clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductList />
        </BrowserRouter>
      </Provider>
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.cart.items.length).toBeGreaterThan(0);
    expect(state.cart.items[0].id).toBe(mockProduct.id);
  });
});
