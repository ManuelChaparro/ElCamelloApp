import { Component, HostListener} from '@angular/core';
import { AdmincampusComponent } from '../admincampus/admincampus.component';
import { AdminusersComponent } from '../adminusers/adminusers.component';
import { AdminbookingsComponent } from '../adminbookings/adminbookings.component';
import { AdminreportsComponent } from '../adminreports/adminreports.component';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {
  public name: string;
  public surname: string;

  constructor(private http: HttpClient){
    const decode_token: object = jwt_decode(JSON.stringify(localStorage.getItem('token')));
    if('infoUser' in decode_token){
      const infoUser =  decode_token.infoUser as Array<object>;
      if('email' in infoUser[0]){
        const url = 'http://localhost:3005/api/user/search';
        const token_email = infoUser[0].email;
        const data = {
          email: token_email as string,
        };
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        this.http.post(url, data, {headers}).subscribe(response => {
          const data = response as Array<object>;
          if('nombres' in data[0] && 'apellidos' in data[0]){
            const names = data[0].nombres as string
            const surnames = data[0].apellidos as string
            this.name = names.split(" ")[0];
            this.surname = surnames.split(" ")[0];
          }
        });
      }
    }
    this.name = '';
    this.surname = '';
  }

  mostrarVentana = false;
  ventanaEstilos = {};

  accion1() {
    console.log('Botón 1 presionado');
  }

  accion2() {
    console.log('Botón 2 presionado');
  }

  @HostListener('document:mousemove', ['$event'])
  actualizarPosicionVentana(event: MouseEvent) {
    this.ventanaEstilos = {
      top: `${event.clientY + 10}px`,
      left: `${event.clientX + 10}px`
    };
  }

  componentes = [
    { nombre: 'Componente 1', componente: AdmincampusComponent},
    { nombre: 'Componente 2', componente: AdminusersComponent},
    { nombre: 'Componente 3', componente: AdminbookingsComponent },
    { nombre: 'Componente 4', componente: AdminreportsComponent },
  ];
  indiceComponenteActual = 0;
  cambiarComponente(indice: number) {
    this.indiceComponenteActual = indice;
  }
}
