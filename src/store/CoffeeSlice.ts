import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import coffeeData from "../data/CoffeeData";
import { CoffeeTypes } from "../models/CoffeeTypes";
import { RootState } from ".";


interface CoffeeTypesState {
    coffeeTypes: CoffeeTypes[];
  }
  
  const initialState: CoffeeTypesState = {
    coffeeTypes: coffeeData,
  };

const coffeeSlice = createSlice({
    name: 'coffeeTypes',
    initialState,
    reducers: {
      setCoffeeTypes: (state, action: PayloadAction<CoffeeTypes[]>) => {
        state.coffeeTypes = action.payload;
      },
    },
  });

  export const { setCoffeeTypes } = coffeeSlice.actions;
  export const selectCoffeeTypes = (state: RootState) => state.coffeeTypes.coffeeTypes;
  export default coffeeSlice.reducer;