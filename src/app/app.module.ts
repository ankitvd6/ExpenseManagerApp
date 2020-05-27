import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ExpenseItemComponent } from './item/em-item.component';
import { ExpenseItemListComponent } from './item-list/em-item-list.component';
import { ExpenseFormComponent } from './add-form/em-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseEditFormComponent } from './update/em-edit-form.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { SortByPipe } from './pipes/sortBy';



@NgModule({
  declarations: [
    AppComponent,
    ExpenseItemComponent,
    ExpenseItemListComponent,
    ExpenseFormComponent,
    DashboardComponent,
    ExpenseEditFormComponent,
    LoginComponent,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AngularFireAuthGuard, SortByPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


