import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


//not sure what all i need
import {FOODLIST} from './food-list';
//import {GROCERYLIST} from './list';
import {GroceryListItem} from './list';
import {MEALLIST} from './food-list';
import {Ingredient} from './list';
import {INGREDIENTS} from './food-list';

@Injectable({ providedIn: 'root' })
export class GroceryListService {
    
    constructor() {
        //does anything call the service first?? its already too late...
        //console.log("service constructor");
        //console.log(this.foodList);
        //this is the FIRST THING THAT HAPPENS... HOW IS IT WRONG?
        
        
        
        this.compileList();
       // console.log(this.groceryList);
        
        //need to send the grocerylist to all listeners...
        this.sendUpdate(this.groceryList);
    }
    
    foodList = FOODLIST;
    
    mealList = MEALLIST;
    groceryList = [];
    
    private subject = new Subject<any>();
    
    getGroceryList(){
        return this.groceryList;
    }
    
    sendUpdate(ing: Ingredient[]){
        //can i make text into ingredient??
        this.subject.next(ing);
        //console.log("update " + ing.name);
    }
    
    addToGroceryList(list: Ingredient[]){
        //console.log(this.list);
        this.subject.next(list);
        //this.list.push(ing.name);
        //console.log(this.list);
    }
    
    updateList(list){
        
        //not needed here
        /*
        this.list = list;
        console.log(this.list);
        */
        
        this.subject.next(list);
    }
    
    
    //??
    print(){
        this.subject.next();   
    }
    
    onUpdate(): Observable<any>{
        return this.subject.asObservable();
    }
    
    /*
    addToList(product:string) {
        this.subject.next({name:product});
    }
    */
 /*
    clearCart() {
        this.subject.next();
    }
    */
 
    getList(): Observable<any>{
        //this.subject.push(new Ingredient(1, "test", 1));
        return this.subject.asObservable();
    }
    
    
    //these methods are for list comipiling:
    //meant for use for longlist
    //this uses name, not id or quantity to check if its the same 
    //TODO analyuze... should i make it name && id?
    /*
    getIndex(list, Ingredient){
        var index = -1;
        var temp = 0;
        for(let item in list){
            //console.log("comparing " + list[item].name + " vs " + Ingredient.name);
            if(list[item].name == Ingredient.name){
                index = temp;
                break;
            }
            temp = temp + 1;
        }
        //console.log("index is " + index);
        return index;
    }
    */
    
    
    
    //TODO OPTIMIZE
    //method takes the foodlist, adds new ingredients to list or updates quantity
    compileList(){
        
        //console.log(this.foodList);
        
        // get ID of foods, ignore repeats
        var meals = [];
        for(let i = 0; i < this.mealList.length; i++){
            for(let j = 0; j < this.mealList[i].foodID.length; j++){
                meals.push(this.mealList[i].foodID[j]);
            }
        }
        
        
        //console.log(meals);
        //this looks something like
        //3 4 1 2 3 4 
        
        console.log(meals);
        var groceryList = [];
        
        for(let k = 0; k < meals.length; k++){
            for(let i = 0; i < this.foodList.length; i++){
                if(meals[k] == this.foodList[i].id){
                    for(let j = 0; j < this.foodList[i].ingredients.length; j++){
                        groceryList.push(this.foodList[i].ingredients[j]);
                    }
                }
                
            }
        }
        

        console.log(groceryList);
        
        //now, consolidate list
        for(let i = 0; i < groceryList.length; i++){
            console.log(groceryList[i].name);
            console.log(this.getIndexFromGL(groceryList, groceryList[i]));
            
        }
        
        
        
        this.groceryList = groceryList;
        
        //console.log(groceryListItems);
        
       
     };
    
    getIndexFromGL(list, gli: GroceryListItem){
        var index = -1;
        var temp = 0;
        for(let i = 0; i < list.length; i++){
            if(list[i].ingredientID == gli.ingredientID){
                //console.log("found at " + item);
                index = temp;
                return (index);
            }
            temp = temp + 1;
        }
    }
   
    lookupIngredientNameByID(iden: number){
        for(let i = 0; i < INGREDIENTS.length; i++){
            if(INGREDIENTS[i].id == iden){
                return INGREDIENTS[i].name;
                break;
            }
        }
    }
    
    /*
    friendlyList = [];
    genUserFriendlyGroceryList(){
        //make a list that has {id, name, quantity}
        console.log(this.groceryList);
        for(let i = 0; i < this.groceryList.length;i++){
            var tempName = this.lookupIngredientNameByID(this.groceryList[i].ingredientID);
            console.log(tempName);
            
            
            
            friendlyList.push();
            
        }
        
        
    }
    */
    
    /*
    //works .... or m,aybe not?
    addToQuantity(iname, iquantity){
        for(let item in this.groceryList){
            if(this.groceryList[item].name == iname){
                console.log(this.groceryList[item].quantity);
                this.groceryList[item].quantity = this.groceryList[item].quantity + iquantity;
                break;
            }
        }   
    }
    */
}
 