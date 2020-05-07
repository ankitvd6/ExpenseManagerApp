import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExpenseItemComponent } from './em-item.component';
import { ExpenseItemListComponent } from './em-item-list.component';
import { ExpenseFormComponent } from './em-form.component';
import { DashboardComponent } from './dashboard.component';
import { ExpenseEditFormComponent } from './em-edit-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ExpenseItemComponent,
    ExpenseItemListComponent,
    ExpenseFormComponent,
    DashboardComponent,
    ExpenseEditFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


