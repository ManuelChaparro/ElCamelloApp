import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(private router: Router){}

  validateUser(){
    alert("Usuario creado correctamente");
    this.router.navigate(['/login']);
  }
}
