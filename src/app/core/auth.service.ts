import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  isLoggedIn(){
    this.afAuth.auth.onAuthStateChanged(function(user){
      if (user)
        return true;
      else  
        return false;
    });
  }

}
