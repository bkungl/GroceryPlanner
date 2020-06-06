import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GroceryListService } from '../../../grocerylist.service';
import { Ingredient } from '../../../list'

@Component({
  selector: 'app-menu-side',
  templateUrl: './menu-side.component.html',
  styleUrls: ['./menu-side.component.css']
})
export class MenuSideComponent implements OnDestroy {
     
    
    groceryList: Ingredient[] = [];
    nameList = [];
    glist = [];
    messages: any[] = [];
    subscription: Subscription;
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
              this.glist = message;
              
              //console.log("glist is: ");
              //console.log(this.glist);
          } else {
            // clear messages when empty message received
            this.messages = [];
          }
        });
        
        //this.groceryList = this.groceryListService.genUserFriendlyGroceryList();
    }
  

    getNameOfIngredientID(id: number){
        return this.groceryListService.lookupIngredientNameByID(id);
    }
    
    
   
    /*
    subscription: Subscription;
    cart: any;
    products: any[] = [];
    constructor(private cartService: GroceryListService) {
        // subscribe to product component
        this.subscription = this.cartService.getList().subscribe(product => {
            if (product) {
                this.products.push(product);
            } else {
                // clear product
                this.products = [];
            }
        });
    }
    */
    
    
    
   ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

}
