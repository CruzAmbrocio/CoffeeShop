import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoffeeBean } from "../models/CoffeeBean";
import { RootState } from ".";

interface CoffeeBeansState {
  coffeeBeans: CoffeeBean[];
};

const initialState: CoffeeBeansState = {
  coffeeBeans: [],
};

const BeansSlice = createSlice({
  name: 'coffeeBeans',
  initialState,
  reducers: {
    setCoffeeBeans: (state, action: PayloadAction<CoffeeBean[]>) => {
      (state as any).coffeeBeans = action.payload;
    },
  },
});

export const { setCoffeeBeans } = BeansSlice.actions;
export const selectCoffeeBeans = (state: RootState) => state.coffeeBeans.coffeeBeans;
export default BeansSlice.reducer;