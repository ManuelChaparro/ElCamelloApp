import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: string = "";
  password: string = "";

  constructor(private router: Router){}

  goToCreateUser(){
    this.router.navigate(['/createUser']);
  }

  goToRecoverPass(){
    this.router.navigate(['/recoverPass']);
  }

  validateLogin(){
    alert(this.user + ' ' + this.password);
    this.router.navigate(['/home']);
  }

}
