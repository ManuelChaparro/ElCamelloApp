import { Component } from '@angular/core';
import { SchedulelistComponent } from '../schedulelist/schedulelist.component';
import { NewscheduleComponent } from '../newschedule/newschedule.component';

@Component({
  selector: 'app-adminschedule',
  templateUrl: './adminschedule.component.html',
  styleUrls: ['./adminschedule.component.css']
})
export class AdminscheduleComponent {
  componentes = [
    { nombre: 'Componente 1', componente: SchedulelistComponent},
    { nombre: 'Componente 2', componente: NewscheduleComponent}
  ];
  indiceComponenteActual = 0;
  cambiarComponente(indice: number) {
    this.indiceComponenteActual = indice;
  }
}
