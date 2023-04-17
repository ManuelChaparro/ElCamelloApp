import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

interface campus{
  name: string,
  description: string,
  address: string,
  id_sede: number
}

@Component({
  selector: 'app-campuslist',
  templateUrl: './campuslist.component.html',
  styleUrls: ['./campuslist.component.css']
})

export class CampuslistComponent {

  public campus_list: Array<campus>;

  ngOnInit(){
    this.loadCampusOnDatabase();
  }

  constructor(private http: HttpClient){
    this.campus_list = [];
  }

  loadCampusOnDatabase(){
    const url = 'http://localhost:3005/api/headquarters/list';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    this.http.get(url, {headers}).subscribe(response => {
      const campus = response as Array<string>;
      campus.forEach(n => {
        const info_campus = n as Object;
        if('nombre_sede' in info_campus && 'descripcion' in info_campus && 'direccion' in info_campus
        && 'id_sedes' in info_campus){
          const campus_obj = {
            name: info_campus.nombre_sede as string,
            description: info_campus.descripcion as string,
            address: info_campus.direccion as string,
            id_sede: info_campus.id_sedes as number,
          }
          this.campus_list.push(campus_obj as campus);
        }
      });
    });
  }

  deleteCampus(id_sedes: number){

  }

}
