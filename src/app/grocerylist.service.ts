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
    unconsolidatedList = [];
    
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
    
 
    getList(): Observable<any>{
        //this.subject.push(new Ingredient(1, "test", 1));
        return this.subject.asObservable();
    }
    
    getUnconsolidatedList(){
        return this.unconsolidatedList;
    }
    
    
    
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
        
        //console.log(meals);
        var groceryList = [];
        
        //this adds each grocery list ingredient to the grocerylist
        for(let k = 0; k < meals.length; k++){
            for(let i = 0; i < this.foodList.length; i++){
                if(meals[k] == this.foodList[i].id){
                    for(let j = 0; j < this.foodList[i].ingredients.length; j++){
                        //this is bad
                        //groceryList.push(this.foodList[i].ingredients[j]);
                        
                        //make new obejcect:
                        var tempID = this.foodList[i].ingredients[j].ingredientID;
                        var tempQuantity = this.foodList[i].ingredients[j].quantity;
                        var tempName = this.foodList[i].ingredients[j].name;
                        groceryList.push(new GroceryListItem(tempID, tempQuantity, tempName));
                    }
                }
                
            }
        }
        

        //send out uncosnolciated
        //this.unconsolidatedList = groceryList;
        
        //console.log(groceryList);
        
        //now, consolidate list for repeat items.. ie if 2 grocery list items remove 1 and update quanitty of other
        var deleteIndexes = [];
        
        //this is buggy bc index is 
        //tempLimit = groceryList.length;
        for(let i = 0; i < groceryList.length; i++){
            //console.log(groceryList[i].name);
            //console.log(groceryList.length);
            var tempIndex = this.getIndexFromGL(groceryList, groceryList[i]);
            //console.log(tempIndex);
            
            if(i != tempIndex){
                //console.log("need to update " + groceryList[i].name);
                
                groceryList[tempIndex].quantity = groceryList[i].quantity + groceryList[tempIndex].quantity;
                
                //console.log("need quantity for the above item is " + groceryList[i].quantity);

                // TODO not safe, dont edit list as im going through it
                groceryList.splice(i, 1);
                
                //decrement iterator THIS IS DANGEROUS
                i =  i = 1;
                //implement this later
                //deleteIndexes.push(tempIndex);
                
                
            }
            
        }
        
        //remove extras safely
        
        
        //console.log(groceryList);
        
        
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
    
    
}
 