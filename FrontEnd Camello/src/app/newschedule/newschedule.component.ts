import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-newschedule',
  templateUrl: './newschedule.component.html',
  styleUrls: ['./newschedule.component.css']
})
export class NewscheduleComponent {

  public campus_list: Iterable<any> | null | undefined;
  public campus_selected: string | null | undefined;

  constructor(private http: HttpClient){
    this.campus_list = undefined;
    this.campus_selected = undefined;
  }

  ngOnInit(){
    this.initCampusList();
  }

  initCampusList(){
    const url = 'http://localhost:3005/api/headquarters/list';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    this.http.get(url, { headers }).subscribe((data) => {
      this.campus_list = data as Iterable<any>;
      const campus_array = Array.from(this.campus_list);
      const ultimoElemento = campus_array.pop();
      if('nombre_sede' in ultimoElemento){
        this.campus_selected = ultimoElemento.nombre_sede;
      }
    });
  }

  updateByCampus(){
    const campus = document.querySelector('#select_campus') as HTMLSelectElement;
    this.campus_selected = campus.value.split(" - ")[1];

  }


  saveSchedule(day: string, firstOpen: string, firstClose:string, secondOpen:string, secondClose:string){

  }
}
