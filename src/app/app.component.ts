import { Component } from '@angular/core';
import { MyAuthService } from './core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expense Manager';
  loginStatus;

  constructor(public myAuthService: MyAuthService, private afAuth: AngularFireAuth) {}

  isLogIn(){
    this.loginStatus = this.afAuth.auth.currentUser;
    // console.log(this.loginStatus);
    return this.loginStatus;
  }

  onSignOut(){
    this.myAuthService.logout();
  }

}  


