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
    
    //remove an item from menu
    deleteMeal(id, date){
        //new attempt
        console.log("attempt delete");
        //var foodsToDelete: number[];
        var foodsToDelete = [];
        
        for(let meal in this.mealList){
            //console.log("test");
            if((date == this.mealList[meal].date) && (id == this.mealList[meal].mealTypeID)){
                //console.log("should remove following recipe ");
                for(let foods in this.mealList[meal].foodID){
                    //console.log(this.mealList[meal].foodID[foods]);
                    foodsToDelete.push(this.mealList[meal].foodID[foods]);
                }
            }
        }
        
        console.log(foodsToDelete);
        //left off here... need to make sure foodlist doesnt incorrectly display quantities
        console.log(this.foodList);
        
        //var ingredientsToUpdate: Ingredient[];
        var ingredientsToUpdate = [];
        
        //for all foods to delete
        for(let fid in foodsToDelete){
            for(let foods in this.foodList){
                //implement HERE
                if(this.foodList[foods].id == foodsToDelete[fid]){
                    for(let ingredients in this.foodList[foods].ingredients){
                        ingredientsToUpdate.push(this.foodList[foods].ingredients[ingredients])
                    }
                }
            }
        }
        
        console.log(ingredientsToUpdate);
        
        
        //LEFT OFF MAKIGN THIS WORK BEFORE GOING TO FIX GROCERY LIST COMPILATION
        //for all ingredeints, updategrocery list
        
        //need a date component of this...
        for(let ingredient in ingredientsToUpdate){
            for(let i = 0; i < this.groceryList.length; i++){
                console.log(this.groceryList[i].id + " vs " + ingredientsToUpdate[ingredient].id);
                if(this.groceryList[i].id == ingredientsToUpdate[ingredient].id){
                    
                    //how much of the quantity is left
                     var tempAmtRemainder = this.groceryList[i].quantity - ingredientsToUpdate[ingredient].quantity;
                     console.log(tempAmtRemainder);
                    
                    
                    //break statement to prevent multiple delete
                     i = this.groceryList.length +1;
                   
                }
                
            }
            
            /*
                var temp = this.groceryList[items].quantity - this.foodList[recipe].ingredients[ingredient].quantity;                    
                //if subtracticing is < 0, send console error about not being in this state
                if(temp < 0){
                    console.log("bad state; negative quantity");
                }
                //if == 0, remove
                else if(temp == 0){
                    console.log("should remove" + this.groceryList[index].name +"from grocery list");
                    
                }
                
                //if > 0, reduce quantiy
                else{
                    console.log("reduce quantity of " + this.groceryList[items].name + " from date " + this.mealList[meal].date);
                }
                
                */
        }
        
        
        
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
