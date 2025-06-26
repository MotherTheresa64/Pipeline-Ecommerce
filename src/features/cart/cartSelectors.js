// Selector to get all cart items from the Redux store's cart slice
export const selectCartItems = (state) => state.cart.items;
// Selector to calculate the total price of all items in the cart
export const selectCartTotal = (state) => 
// Sum up price * quantity for each item in the cart
state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
