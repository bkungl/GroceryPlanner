//todo implement category feature
export class Ingredient {
    id: number;
    name: string;
    quantity: number;
    category: string;
    
    constructor(id, name, quantity){
        this.id=id;
        this.name = name;
        this.quantity=quantity;
    }
}

export class GroceryListItem {
    ingredientID: Ingredient;
        //as id, name, and category, 
    quantity: number;
    name: string;
    
    constructor(ingredient, quantity, name){
        this.ingredientID = ingredient;
        this.quantity = quantity;
        this.name = name;
    }
    
    /*
    constructor(){
        
    }*/
}

export interface GroceryList {
    item: GroceryListItem[];
}

export interface Recipe {
    id: number;
    foodName: string;
    ingredients: GroceryListItem[];
}

export interface Meal {
    mealTypeID: number;
    mealTypeName: string;
    date: string;
    foodID: number[];
}















