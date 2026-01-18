import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./cartSlice";

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "card";
  date: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;

// Thunks
import { AppDispatch, RootState } from "../store";
import { clearCart, selectCartTotal } from "./cartSlice";

export const createOrder =
  (paymentMethod: "cash" | "card") =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const cart = state.cart.items;
    const { subtotal, tax, total } = selectCartTotal(state);

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      subtotal,
      tax,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    return order;
  };
