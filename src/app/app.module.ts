import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BodyComponent } from './body/body.component';
import { MenuComponent } from './body/menu/menu.component';
import { FavoritesComponent } from './body/favorites/favorites.component';
import { CustomRecipesComponent } from './body/custom-recipes/custom-recipes.component';
import { GroceryListComponent } from './body/grocery-list/grocery-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { MenuMainComponent } from './body/menu/menu-main/menu-main.component';
import { MenuSideComponent } from './body/menu/menu-side/menu-side.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BodyComponent,
    MenuComponent,
    FavoritesComponent,
    CustomRecipesComponent,
    GroceryListComponent,
    MenuMainComponent,
    MenuSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
