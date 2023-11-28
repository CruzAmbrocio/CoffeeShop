import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import beansData from "../data/BeansData";
import { CoffeeBeans } from "../models/CoffeeBeans";
import { RootState } from ".";


interface CoffeeBeansState {
    coffeeBeans: CoffeeBeans[];
  }
  
  const initialState: CoffeeBeansState = {
    coffeeBeans: beansData,
  };

const BeansSlice = createSlice({
    name: 'coffeeBeans',
    initialState,
    reducers: {
      setCoffeeBeans: (state, action: PayloadAction<CoffeeBeans[]>) => {
        state.coffeeBeans = action.payload;
      },
    },
  });

  export const { setCoffeeBeans } = BeansSlice.actions;
  export const selectCoffeeBeans = (state: RootState) => state.coffeeBeans.coffeeBeans;
  export default BeansSlice.reducer;