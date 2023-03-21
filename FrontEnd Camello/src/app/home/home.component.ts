import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public name: string;
  public surname: string;
  public number: number | undefined;

  constructor(){
    const token = localStorage.getItem('token');
    const decode_token: string | undefined = jwt_decode(JSON.stringify(token));
    console.log(typeof(decode_token));


    this.name = '';
    this.surname = '';
    this.number = undefined;
  }




}
