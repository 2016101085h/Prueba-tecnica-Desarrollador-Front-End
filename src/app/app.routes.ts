import { SearchComponent } from './components/search/search.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarritoComponent } from './components/carrito/carrito.component';
export const ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'libro/:sku', component: SearchComponent },
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];
