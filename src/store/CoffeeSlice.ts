import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CoffeeType } from "../models/CoffeeType";
import { CoffeeBean } from "../models/CoffeeBean";
import { RootState } from ".";

interface FavoriteItem {
  type: string;
  id: string;
}

interface CoffeeState {
  favoriteList: FavoriteItem[];
  coffeeBeans: CoffeeBean[];
  coffeeTypes: CoffeeType[];
};

const initialState: CoffeeState = {
  favoriteList: [],
  coffeeBeans: [],
  coffeeTypes: [],
};

const coffeeSlice = createSlice({
  name: 'coffeeTypes',
  initialState,
  reducers: {
    setCoffeeTypes: (state, action: PayloadAction<CoffeeType[]>) => {
      (state as any).coffeeTypes = action.payload;
    },
    setCoffeeBeans: (state, action: PayloadAction<CoffeeBean[]>) => {
      (state as any).coffeeBeans = action.payload;
    },
    addToFavorite: (state, action) => {
      const details = action.payload;
      const favoriteItem = details.type == "Coffee" ? state.coffeeTypes.find((item) => item.id == details.id) : state.coffeeBeans.find((item) => item.id == details.id);
      if (favoriteItem) {
        favoriteItem.favorite = true;
        state.favoriteList.push(favoriteItem);
      }
    },
    removeFromFavorite: (state, action) => {
      const details = action.payload;
      const favoriteItem = details.type == "Coffee" ? state.coffeeTypes.find((item) => item.id == details.id) : state.coffeeBeans.find((item) => item.id == details.id);
      if (favoriteItem) {
        favoriteItem.favorite = false;
        state.favoriteList = state.favoriteList.filter((item) => item.id !== details.id);
      }
    },
  },
});

export const { setCoffeeBeans, setCoffeeTypes, addToFavorite, removeFromFavorite } = coffeeSlice.actions;
export const selectCoffeeTypes = (state: RootState) => state.coffeeData.coffeeTypes;
export const selectCoffeeBeans = (state: RootState) => state.coffeeData.coffeeBeans;
export const selectFavoriteList = (state: RootState) => state.coffeeData.favoriteList;
export default coffeeSlice.reducer;