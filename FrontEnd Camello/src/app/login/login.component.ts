import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpClient){}

  goToCreateUser(){
    this.router.navigate(['/createUser']);
  }

  goToRecoverPass(){
    this.router.navigate(['/recoverPass']);
  }

  validateLogin(){
    this.registerUser();
  }

  public registerUser() {
    const url = 'http://localhost:3005/api/user/login';
    const data = {
      email: this.user,
      password: this.password
    };
    this.http.post(url, data).subscribe(response => {
      if('message' in response){
        const div_email = document.querySelector('#warn_email') as HTMLElement;
        const div_pass = document.querySelector('#warn_pass') as HTMLElement;
        if(response.message == "Email incorrecto"){
          div_email.style.display = 'flex';
          div_pass.style.display = 'none';
        }else{
          div_email.style.display = 'none';
          div_pass.style.display = 'flex';
        }
      }else if('token' in response){
        const token = response.token;
        localStorage.setItem("token", JSON.stringify(token));
        this.router.navigate(['/home']);
      }
    });
  }
}
