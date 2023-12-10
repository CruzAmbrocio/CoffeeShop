import { createSlice } from "@reduxjs/toolkit";
import { ImageProps } from "react-native";
import { RootState } from ".";

interface CartPrice {
  size: string,
  price: string,
  quantity: number
}

interface CartItem {
  id: string;
  index: number;
  name: string;
  roasted: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  type: string;
  prices: CartPrice[];
}

interface OrderHistoryItem {
  OrderDate: string;
  CartList: CartItem[];
  CartListPrice: string;
}

interface CartState {
  cartList: CartItem[];
  orderHistory: OrderHistoryItem[];
}

const initialState: CartState = {
  cartList: [],
  orderHistory: []
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const params = action.payload;
      const cartItemIndex = state.cartList.findIndex((item) => item.id === params.id);
      const cartItem = state.cartList.find((item) => item.id === params.id);

      if (cartItem) {
        const existingCartItem = state.cartList[cartItemIndex];
        const priceIndex = existingCartItem.prices.findIndex((price) => price.size === params.prices[0].size);

        if (state.cartList[cartItemIndex].prices[priceIndex]) {
          state.cartList[cartItemIndex].prices[priceIndex].quantity += 1;
        } else {
          state.cartList[cartItemIndex].prices.push({ ...params.prices[0], quantity: 1 });
        }
      } else {
        state.cartList.push({
          ...params,
          prices: [{ ...params.prices[0], quantity: 1 }],
        })
      }
    },
    removeFromCart: (state, action) => {
      const params = action.payload;
      const cartItemIndex = state.cartList.findIndex((item) => item.id === params.id);
      const cartItem = state.cartList.find((item) => item.id === params.id);

      if (cartItem) {
        const existingCartItem = state.cartList[cartItemIndex];
        const priceIndex = existingCartItem.prices.findIndex((price) => price.size === params.prices[0].size);
        if (existingCartItem.prices[priceIndex]) {
          const newQuantity = existingCartItem.prices[priceIndex].quantity - 1;
          if (newQuantity >= 1) {
            state.cartList[cartItemIndex].prices[priceIndex].quantity = newQuantity;
          } else {
            // Remove the size if the quantity is less than 1
            state.cartList[cartItemIndex].prices.splice(priceIndex, 1);
            // Remove the entire item if there are no sizes left
            if (state.cartList[cartItemIndex].prices.length === 0) {
              state.cartList.splice(cartItemIndex, 1);
            }
          }
        }
      }
    },
    addToOrderHistory: (state, action) => {
      let total = state.cartList.reduce((total, item) => {
        return (
          total +
          item.prices.reduce((itemTotal, price) => {
            return itemTotal + parseFloat(price.price) * price.quantity;
          }, 0)
        );
      }, 0);
      if (state.orderHistory.length > 0) {
        state.orderHistory.unshift({
          OrderDate:
            new Date().toDateString() +
            ' ' +
            new Date().toLocaleTimeString(),
          CartList: state.cartList,
          CartListPrice: total.toFixed(2).toString(),
        });
      } else {
        state.orderHistory.push({
          OrderDate:
            new Date().toDateString() +
            ' ' +
            new Date().toLocaleTimeString(),
          CartList: state.cartList,
          CartListPrice: total.toFixed(2).toString(),
        });
      }
      state.cartList = [];
    }
  }
});

export const { addToCart, removeFromCart, addToOrderHistory } = CartSlice.actions;
export const selectCartList = (state: RootState) => state.cart.cartList;
export const selectOrderHistory = (state: RootState) => state.cart.orderHistory;

export const selectTotal = (state: RootState): number => {
  return state.cart.cartList.reduce((total, item) => {
    return (
      total +
      item.prices.reduce((itemTotal, price) => {
        return itemTotal + parseFloat(price.price) * price.quantity;
      }, 0)
    );
  }, 0);
};

export default CartSlice.reducer;