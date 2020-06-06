import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './body/menu/menu.component';
import { FavoritesComponent } from './body/favorites/favorites.component';
import { CustomRecipesComponent } from './body/custom-recipes/custom-recipes.component';
import { GroceryListComponent } from './body/grocery-list/grocery-list.component';

const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'custom', component: CustomRecipesComponent },
    { path: 'groceries', component: GroceryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
