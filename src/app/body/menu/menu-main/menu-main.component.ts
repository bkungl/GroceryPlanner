import { Component, OnInit } from '@angular/core';
import {FOODLIST} from '../../../food-list';
import {MEALLIST} from '../../../food-list';
import {GROCERYLIST} from '../../../food-list';
import {Ingredient} from '../../../list';
import {GroceryListItem} from '../../../list';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { GroceryListService } from '../../../grocerylist.service';



@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.css']
})
export class MenuMainComponent implements OnInit {

  constructor(private groceryListService: GroceryListService) {
    //console.log("no, im first");
  
  }

  ngOnInit(): void {
      
      this.getDates();
      
      
      //this.groceryListService.sendUpdate(this.groceryList);
     
      //this.fillGroceryList();
      
       // this.compileList();
        this.sendMessage();
      
      
      
      
      this.groceryList = this.groceryListService.getGroceryList();
      this.groceryListService.updateList(this.groceryList);
      
    
      
      //for observable later
      //this.getList();
  }
    
    sendMessage(): void {
        this.groceryListService.sendUpdate(this.groceryList);
    }
    
    //var foodNum2 = this.Rand(100,1000);
    //addToGroceryList(ing: Ingredient) {
    addToGroceryList() {
        var foodNum2 = this.Rand(100,1000);
        console.log(this.groceryList);
        this.groceryList.push(new Ingredient(foodNum2+100, "testitem"+foodNum2, 1));
        console.log(this.groceryList);
        //this.groceryListService.addToGroceryList(this.groceryList);
        this.groceryListService.updateList(this.groceryList);
        this.ngOnInit();
    }
    
    addToGroceryList2(ing: Ingredient) {
        //var foodNum2 = this.Rand(100,1000);
        //var temp =  this.groceryList.length + 1;
        //console.log(this.groceryList);
        this.groceryList.push(ing);
        //console.log(this.groceryList);
        //this.groceryListService.addToGroceryList(this.groceryList);
        this.groceryListService.updateList(this.groceryList);
        
        
        //i thinkk this fixes nothing?
        //this.ngOnInit();
    }
    

    foodList = FOODLIST;
    mealList = MEALLIST;
    groceryList = GROCERYLIST;
    dates = [];
    
    //tyhis is for drag and drop... need to analyze to fix add snack broken drag error
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.mealList, event.previousIndex, event.currentIndex);
    }
    
   
    
    //works
    getDates(){
        //check the rest      
        var x = 0;       
        for(let i in this.mealList){
            if(this.dates.length < 1){
                this.dates.push(this.mealList[0].date);
            }           
            //if date exists in dates, ignore
            //console.log(this.mealList[i].date.indexOf('three') > -1)
            if(this.dates.indexOf(this.mealList[x].date) > -1){
                //console.log("in list already");
            }
            else{
                this.dates.push(this.mealList[x].date);
            }
            x = x+1;
        }        
    }
   
    //need to redo
    //this section is hard coded for snacks because its not implemented yet
    Rand(min: number, max: number): number {
        return (Math.random() * (max - min + 1) | 0) + min;
    }   
    addSnack(date){
        //fake data for now:
        var temp =  this.groceryList.length + 1;
        var tempIng = new Ingredient(temp, "Test value" + temp, 1);
        var tempGLI = new GroceryListItem(temp, 1, "Test value" + temp);
        
        //this doesnt
        var foodNum = this.Rand(100,1000);
        this.mealList.push(
            {"mealTypeID": this.Rand(1001, 2000), "mealTypeName": "Snack", "date":date, "foodID":[temp]}
        );
        this.foodList.push(
             {"id":foodNum, "foodName":"Random Food " + foodNum, "ingredients":[tempGLI]}
        );
        
        //this works
        this.addToGroceryList2(tempIng);
       
    }
    
    addSnack2(date){
        //on click, open up a dropdown for inputting a new recipe.
        
    }
    
 
    getMealFromID(id, date){
        for(let i = 0; i < this.mealList.length; i++){
            if((this.mealList[i].mealTypeID == id) && (this.mealList[i].date == date)){
                return this.mealList[i];
            }
        }
    }
    
    getIngredientsFromRecipeID(recipeID){
        //console.log(this.foodList);
        var ingredientsArr = [];
        for(let i = 0; i < this.foodList.length; i++){
            if(this.foodList[i].id == recipeID){
                for(let j = 0; j < this.foodList[i].ingredients.length; j++){
                    ingredientsArr.push(this.foodList[i].ingredients[j]);
                }
            }   
        }
        
        return ingredientsArr;
    }
    
    getIndexOfItemOnGroceryList(id){
        for(let i = 0; i < this.groceryList.length; i++){
            if(this.groceryList[i].ingredientID == id){
                return i;
            }
        }
    }
    
    deleteMeal2(id, date){
        //get all recipes in the meal
        var deleteRecipes = [];
        
        var tempMeal = this.getMealFromID(id, date);
       // console.log(tempMeal);
        
        for(let i = 0; i < tempMeal.foodID.length; i++){
            deleteRecipes.push(tempMeal.foodID[i]);
        }
        
      //  console.log(deleteRecipes);
        
        //get meal ingredients
        var tempIngredients = [];
        
        //console.log(deleteRecipes);
        
        for(let i = 0; i < deleteRecipes.length; i++){
            tempIngredients.push(this.getIngredientsFromRecipeID(deleteRecipes[i]));
        }
        //at this point have a list of ingredients to remove
        
        //need to get the GLI, which includes the quantity of that item
       // console.log(tempIngredients);
        
       // console.log(this.groceryList);
       
        //for all recipes, go through the grocery list and either update quantity or remove
       for(let i = 0; i < tempIngredients.length; i++){
           for(let j = 0; j < tempIngredients[i].length; j++){
               //console.log(tempIngredients[i][j].name);
               var glIndex = this.groceryListService.getIndexFromGL(this.groceryList, tempIngredients[i][j]);
               
               this.groceryList[glIndex].quantity = this.groceryList[glIndex].quantity - tempIngredients[i][j].quantity;
               if(this.groceryList[glIndex].quantity == 0){
                   this.groceryList.splice(glIndex, 1);
               }
           }
           
           
           
       }
       // console.log(this.groceryList);
        
        
        
        //delete the meal:
        for(let i = 0; i < this.mealList.length; i++){
            if(this.mealList[i].mealTypeID == id){
                this.mealList.splice(i,1);
                break;
            }
        }
        
        //finally, update the list:
        this.groceryListService.updateList(this.groceryList);
    }
    
    //getindex of an item
    
    
    //test function off +meal button
    logList(){
        console.log(FOODLIST);
    }
    
    /*
    
    //error, is adding every time the init is called
    addToQuantity(iname, iquantity){
        for(let item in this.groceryList){
            if(this.groceryList[item].name == iname){
                this.groceryList[item].quantity = this.groceryList[item].quantity + iquantity;
                break;
            }
        }
    }
    */
}
