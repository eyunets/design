import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { BurgersComponent }      from './burgers/burgers.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { BasketComponent } from './basket/basket.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'home', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'burgers', component: BurgersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'about', component: AboutComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
