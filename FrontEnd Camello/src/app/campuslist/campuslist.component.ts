import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import * as bootstrap from 'bootstrap';

interface campus{
  name: string,
  description: string,
  quantity_spaces: number,
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

    const decode_token: object = jwt_decode(JSON.stringify(localStorage.getItem('token')));
    if('infoUser' in decode_token){
      const infoUser =  decode_token.infoUser as Array<object>;
      if('rol' in infoUser[0]){
        const rol = infoUser[0].rol;
        this.http.get(url, {headers}).subscribe(response => {
          const campus = response as Array<string>;
          campus.forEach(n => {
              const info_campus = n as Object;
              if('nombre_sede' in info_campus && 'descripcion' in info_campus && 'direccion' in info_campus
              && 'id_sede' in info_campus){
                const url = 'http://localhost:3005/api/headquarters/spaces/quantity';
                const data = {
                  headquarter_id: info_campus.id_sede,
                  rol: rol
                }
                this.http.post(url, data, {headers}).subscribe(res => {
                  const xd = res as Array<string>;
                  xd.forEach(j => {
                    const xdd = j as Object;
                    if('quantity' in xdd){
                      const newCampus = {
                        name: info_campus.nombre_sede,
                        description: info_campus.descripcion,
                        quantity_spaces: xdd.quantity,
                        address: info_campus.direccion,
                        id_sede: info_campus.id_sede
                      }
                      this.campus_list.push(newCampus as campus);
                    }
                  });
                });
              }
          });
        });
      }
    }
  }

  showDeleteModal(){
    const modal = document.querySelector('#deleteModal') as HTMLElement;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  }

  deleteCampus(id_sede: number){
    const decode_token: object = jwt_decode(JSON.stringify(localStorage.getItem('token')));
    if('infoUser' in decode_token){
      const infoUser =  decode_token.infoUser as Array<object>;
      if('id_usuario' in infoUser[0] && 'rol' in infoUser[0]){
        const url = 'http://localhost:3005/api/headquarters/delete';
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        const data = {
          headquarter_id: id_sede,
          rol: infoUser[0].rol,
          id_user: infoUser[0].id_usuario
        };
        this.http.post(url, data, {headers}).subscribe(response => {
          if('message' in response){
            if(response.message === '0'){
              location.reload();
            }else{
              alert("Error");
            }
          }
        });
      }
    }
  }
}
