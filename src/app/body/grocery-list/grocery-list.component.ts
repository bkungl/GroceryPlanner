import { Component, OnInit, OnDestroy } from '@angular/core';
import {GROCERYLIST} from '../../food-list';
import {MEALLIST} from '../../food-list';
import {Ingredient} from '../../list';

import { Subscription } from 'rxjs';
import { GroceryListService } from '../../grocerylist.service';



@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnDestroy, OnInit {
    ngOnInit(): void {
        this.getList();
        console.log(this.groceryList);
     }
    
    groceryList: Ingredient[] = [];
    //glist = [];
    messages: any[] = [];
    subscription: Subscription;
    
    //does this even do anything?
    
    constructor(private groceryListService: GroceryListService){
        // subscribe to home component messages
        this.subscription = this.groceryListService.onUpdate().subscribe(message => {
          if (message) {
              //console.log(message);//undefined
              //console.log("got an updated list");
              //console.log(message);
              this.messages.push(message);
              //this isnt what i want.. currently this adds the new message to the list
              //this.glist.push(message[0]);
              //instead, i want to make the list update to new list
              
              //i commented this bc it doesnt do shit
              //this.groceryList = message;
              console.log("a");
              
              //console.log("glist is: ");
              //console.log(this.glist);
          } else {
            // clear messages when empty message received
            this.messages = [];
              console.log("b");
          }
        });
    }
    
    
     getList(){
        this.groceryList = this.groceryListService.getGroceryList();
    }
 
    
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
    
}
