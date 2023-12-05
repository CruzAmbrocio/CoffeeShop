import { ImageProps } from "react-native";

export interface CoffeeBean {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: ImageProps;
  imagelink_portrait: ImageProps;
  ingredients: string;
  special_ingredient: string;
  prices: Array<CoffeeBeanPrice>;
  average_rating: number;
  ratings_count: string;
  favorite: boolean;
  type: string;
  index: number;
}

export interface CoffeeBeanPrice {
  size: string;
  price: string;
  currency: string;
}
