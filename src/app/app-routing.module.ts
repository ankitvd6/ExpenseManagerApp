import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseItemComponent } from './em-item.component';
import { DashboardComponent } from './dashboard.component';
import { ExpenseEditFormComponent } from './em-edit-form.component';

const routes: Routes =[
  { path: 'edit', component: ExpenseEditFormComponent },
  { path: ':heading', component: ExpenseItemComponent},
  { path: '', component: DashboardComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
