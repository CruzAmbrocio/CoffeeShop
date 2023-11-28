import { configureStore } from "@reduxjs/toolkit";
import BeansSlice from "./BeansSlice";
import CoffeeSlice from "./CoffeeSlice";

export const store = configureStore({
    reducer: {
        coffeeBeans: BeansSlice,
        coffeeTypes: CoffeeSlice,
    }
});
export type RootState = ReturnType<typeof store.getState>;