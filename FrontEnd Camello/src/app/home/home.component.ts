import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public name: string | unknown;
  public surname: string;
  public number: number | undefined;
  public rol: string | unknown;

  constructor(){
    this.name = '';
    this.surname = '';
    this.number = undefined;
    this.rol = '';

    const token = localStorage.getItem('token');
    const decode_token: object = jwt_decode(JSON.stringify(token));

    if('exp' in decode_token){
      const exp = decode_token.exp as number;
      const date = new Date(0);
      date.setUTCSeconds(exp);
    }


    if('infoUser' in decode_token){
      const xd = decode_token.infoUser as Array<object>;
      if('rol' in xd[0] && 'email' in xd[0]){
        this.name = xd[0].email;
        this.rol = xd[0].rol;
      }


    }
  }

}
