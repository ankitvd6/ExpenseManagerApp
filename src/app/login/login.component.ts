import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from '../core/auth.service';
import { ExpenseManagerService } from '../em.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  error;
  action : 'login' | 'signup' = 'login';

  constructor(public afAuth: AngularFireAuth, 
    public router: Router, 
    private myAuthService: MyAuthService,
    private expenseManagerService: ExpenseManagerService,
    ) { }

  ngOnInit(){
  }

  async onSubmit(form: NgForm) {
    this.loading = true;

    const { firstName, lastName, email, password } = form.value;

    let resp;
    try{
      if(this.isSignUp()){
        resp = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
        await resp.user.updateProfile({displayName: `${firstName} ${lastName}`});

        await this.expenseManagerService.saveUserDetails();
        form.reset();
      }
      else{
        resp = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      }
     
      const uid = resp.user.uid;
      // console.log(`${uid}`);
      this.router.navigateByUrl(`dashboard/${uid}`);
    }catch (error){
      console.log(error.message);
      this.error = error;
    }
    this.loading = false;
  }

  isLogin(){
    return this.action === 'login';
  }

  isSignUp(){
    return this.action === 'signup';
  }

}
