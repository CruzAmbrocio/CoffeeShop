import { configureStore } from "@reduxjs/toolkit";
import CoffeeSlice from "./CoffeeSlice";
import CartSlice from "./CartSlice";

export const store = configureStore({
    reducer: {
        coffeeData: CoffeeSlice,
        cart: CartSlice
    }
});
export type RootState = ReturnType<typeof store.getState>;