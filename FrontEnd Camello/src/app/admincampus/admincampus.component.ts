import { Component } from '@angular/core';
import { CampuslistComponent } from '../campuslist/campuslist.component';
import { NewcampusComponent } from '../newcampus/newcampus.component';


@Component({
  selector: 'app-admincampus',
  templateUrl: './admincampus.component.html',
  styleUrls: ['./admincampus.component.css']
})
export class AdmincampusComponent {

  constructor(){

  }

  changeOption(option: number){

  }

  componentes = [
    { nombre: 'Componente 1', componente: CampuslistComponent},
    { nombre: 'Componente 2', componente: NewcampusComponent}
  ];
  indiceComponenteActual = 1;
  cambiarComponente(indice: number) {
    this.indiceComponenteActual = indice;
  }

}
