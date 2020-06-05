import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, loggedIn, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ExpenseItemComponent } from './item/em-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseEditFormComponent } from './update/em-edit-form.component';
import { LoginComponent } from './login/login.component';
import { map } from 'rxjs/operators';
import { ExpenseFormComponent } from './add-form/em-form.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInUserToDashboard = () => map(user => user ? ['dashboard', (user as any).uid]: true);
const onlyAllowSelf = route => 
  map( user => (!!user && route.params.id == (user as any).uid) || ['']);

const routes: Routes =[
  // { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}},
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInUserToDashboard}},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: {authGuardPipe: onlyAllowSelf}},
  { path: 'add', component: ExpenseFormComponent },
  { path: 'edit/:id', component: ExpenseEditFormComponent },
  { path: ':id', component: ExpenseItemComponent},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload"
    }),
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
