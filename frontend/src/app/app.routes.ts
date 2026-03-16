import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { ProduitsByCategoryComponent } from './pages/produits-by-category/produits-by-category.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { authGuard } from './guards/auth.guard';
import {DashboardAdminComponent} from "./pages/admin-dashboard/admin-dashboard.component";
import {AdminAuditComponent} from "./pages/audit-log/audit-log.component";
import {RegisterComponent} from "./pages/register/register.component";

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

  {
    path: 'categories/:id/produits',
    component: ProduitsByCategoryComponent,
    canActivate: [authGuard]
  },

  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {path: 'admin/audit',
  component: AdminAuditComponent},
  {
    path: 'admin/dashboard',
    component: DashboardAdminComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path:"register",
    component:RegisterComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }

];
