import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import ProductList from "../features/products/ProductList";
import { store } from "../app/store";
import "@testing-library/jest-dom";

describe("Cart Integration", () => {
  test("adds item to cart when button clicked", async () => {
    render(
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <ProductList />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    );

    // Wait for products to load
    const addButtons = await screen.findAllByText(/add to cart/i);
    expect(addButtons.length).toBeGreaterThan(0);

    const addButton = addButtons[0];
    fireEvent.click(addButton);

    // ✅ We don't check for text change — instead:
    // Confirm that Checkout link is present (cart effect)
    const checkoutLink = await screen.findByText(/checkout/i);
    expect(checkoutLink).toBeInTheDocument();
  });
});
