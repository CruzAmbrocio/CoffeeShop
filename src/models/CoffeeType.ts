import { ImageProps } from "react-native";

export interface CoffeeType {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: ImageProps;
  imagelink_portrait: ImageProps;
  ingredients: string;
  special_ingredient: string;
  prices: Array<CoffeeTypePrice>;
  average_rating: number;
  ratings_count: string;
  favorite: boolean;
  type: string;
  index: number;
}

export interface CoffeeTypePrice {
  size: string;
  price: string;
  currency: string;
}
