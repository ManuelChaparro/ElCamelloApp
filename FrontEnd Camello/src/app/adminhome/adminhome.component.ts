import { Component } from '@angular/core';
import { AdmincampusComponent } from '../admincampus/admincampus.component';
import { AdminusersComponent } from '../adminusers/adminusers.component';
import { AdminbookingsComponent } from '../adminbookings/adminbookings.component';
import { AdminreportsComponent } from '../adminreports/adminreports.component';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {
  componentes = [
    { nombre: 'Componente 1', componente: AdminusersComponent},
    { nombre: 'Componente 2', componente: AdmincampusComponent},
    { nombre: 'Componente 3', componente: AdminbookingsComponent },
    { nombre: 'Componente 4', componente: AdminreportsComponent },
  ];
  indiceComponenteActual = 0;
  cambiarComponente(indice: number) {
    this.indiceComponenteActual = indice;
  }
}
