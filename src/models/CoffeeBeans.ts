export class CoffeeBeans{
    id: string;
    name: string;
    description: string;
    roasted: string;
    imagelink_square: string; // Assuming this is a link to an image
    imagelink_portrait: string; // Assuming this is a link to an image
    ingredients: string;
    special_ingredient: string;
    prices: Array<{
      size: string;
      price: string;
      currency: string;
    }>;
    average_rating: number;
    ratings_count: string;
    favorite: boolean;
    type: string;
    index: number;

    constructor( 
        id: string, name: string,
        description: string,
        roasted: string,
        imagelink_square: string,
        imagelink_portrait: string,
        ingredients: string,
        special_ingredient: string,
        prices: Array<{ size: string; price: string; currency: string; }>,
        average_rating: number,
        ratings_count: string,
        favorite: boolean,
        type: string,
        index: number
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.roasted = roasted;
        this.imagelink_square = imagelink_square;
        this.imagelink_portrait = imagelink_portrait;
        this.ingredients = ingredients;
        this.special_ingredient = special_ingredient;
        this.prices = prices;
        this.average_rating = average_rating;
        this.ratings_count = ratings_count;
        this.favorite = favorite;
        this.type = type;
        this.index = index;
    }
}
