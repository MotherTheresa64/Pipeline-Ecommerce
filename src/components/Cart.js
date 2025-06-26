import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
const Cart = () => {
    // Select cart items array from Redux store's cart slice state
    const cartItems = useSelector((state) => state.cart.items);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Your Cart" }), _jsx("ul", { children: cartItems.map((item, idx) => (_jsxs("li", { children: [item.name, " x ", item.quantity, " \u2014 $", item.price * item.quantity] }, idx))) })] }));
};
export default Cart;
