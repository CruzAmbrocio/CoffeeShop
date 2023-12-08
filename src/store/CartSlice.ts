import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  type: string;
  id: string;
  quantity: number;
}

interface FavoriteItem {
  type: string;
  id: string;
}

interface AppState {
  cartPrice: number;
  cartList: CartItem[];
  orderHistory: CartItem[];
}

const initialState:AppState = {
	cartPrice: 0,
	cartList: [],
	orderHistory: []
}

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action)=>{
			const newItem = action.payload.product;
			const cartItem = state.cartList.find((item)=>item.id == newItem.id);
			if(cartItem){
				cartItem.quantity+=1;
			}else{
			}
		},
	}
});

export const { addToCart } = CartSlice.actions;
// export const selectCoffeeBeans = (state: RootState) => state.coffeeBeans.coffeeBeans;
export default CartSlice.reducer;