import {Recipe} from './list';
import {Ingredient} from './list';
import {Meal} from './list';
import {GroceryList} from './list';
import {GroceryListItem} from './list';


export const INGREDIENTS = [
     {"id":1, "name": "Bacon"}
    ,{"id":2, "name": "Lettuce"}
    ,{"id":3, "name": "Tomato"}
    ,{"id":4, "name": "Bread"}
    ,{"id":5, "name": "Egg"}
    ,{"id":6, "name": "Milk"}
    ,{"id":7, "name": "Banana"}
    ,{"id":8, "name": "Greek Yogurt"}
    ,{"id":9, "name": "Almond Milk"}
    ,{"id":10, "name": "Raw Carrots"}
    
]

//TODO:
//mealtype id should be removed, also mealtype, also date
//this is a recipe?
export const FOODLIST: Recipe[] = [    
    {"id":1, "foodName":"BLT Sandwich", "ingredients":[new GroceryListItem(1,2, "Bacon"), new GroceryListItem(2, 1, "Lettuce"), new GroceryListItem(3,1, "Tomato"), new GroceryListItem(4,1, "Bread")]},
    {"id":2, "foodName":"French Toast", "ingredients":[new GroceryListItem(4,1, "Bread"), new GroceryListItem(5,1,"Egg"), new GroceryListItem(6,1,"Milk"),]},
    //for some reason this gets doubles due to the dates issue
    {"id":3, "foodName":"Smoothie", "ingredients":[new GroceryListItem(7,2,"Banana"), new GroceryListItem(8,1,"Greek Yogurt"), new GroceryListItem(9,1,"Almond Milk"),]},
    {"id":4, "foodName":"Carrots", "ingredients":[new GroceryListItem(10,2,"Raw Carrots")]}
];

//TODO: add date
export const MEALLIST: Meal[] = [
    {"mealTypeID": 1, "mealTypeName": "Snack", "date": "5/30/2020", "foodID":[3,4] },
    {"mealTypeID": 2, "mealTypeName": "Meal", "date": "5/30/2020", "foodID":[1]},
    {"mealTypeID": 3, "mealTypeName": "Meal", "date": "5/30/2020", "foodID":[2]}
    //this ruins everythinhg.... why?
    ,{"mealTypeID": 4, "mealTypeName": "Snack", "date": "5/31/2020", "foodID":[3,4]}
    
];


export const GROCERYLIST = [
    //new Ingredient(1,"Bacon",2), new Ingredient(2,"Bread",1)
];



