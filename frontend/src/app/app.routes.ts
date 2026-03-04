import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { authGuard } from './guards/auth.guard';
import {ProduitsByCategoryComponent} from "./pages/produits-by-category/produits-by-category.component";

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: 'produits',
    component: ProduitsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard]
  },

  {
    path: 'stock',
    component: StocksComponent,
    canActivate: [authGuard]
  },
  { path: 'categories/:id/produits', component: ProduitsByCategoryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' }

];
