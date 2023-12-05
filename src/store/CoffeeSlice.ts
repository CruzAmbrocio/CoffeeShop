import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoffeeType } from "../models/CoffeeType";
import { RootState } from ".";

interface CoffeeTypesState {
  coffeeTypes: CoffeeType[];
};

const initialState: CoffeeTypesState = {
  coffeeTypes: [],
};

const coffeeSlice = createSlice({
  name: 'coffeeTypes',
  initialState,
  reducers: {
    setCoffeeTypes: (state, action: PayloadAction<CoffeeType[]>) => {
      (state as any).coffeeTypes = action.payload;
    },
  },
});

export const { setCoffeeTypes } = coffeeSlice.actions;
export const selectCoffeeTypes = (state: RootState) => state.coffeeTypes.coffeeTypes;
export default coffeeSlice.reducer;