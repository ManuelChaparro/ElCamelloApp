import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders} from '@angular/common/http';

interface stockObject{
  id: number,
  name: string,
  type: string,
  description: string,
  price: number
}

interface space{
  id: number,
  name: string,
  description: string,
  fee: number,
  stock: Array<stockObject>
}

@Component({
  selector: 'app-newcampus',
  templateUrl: './newcampus.component.html',
  styleUrls: ['./newcampus.component.css']
})

export class NewcampusComponent {
  public campusName: string;
  public direction: string;
  public city: string;
  public department: string;
  public description: string;
  public schedule;
  public selectedSchedule: string;

  public countSpace: number;
  public spaceName: string;
  public spaceFee: number;
  public spaceDescription: string;
  public objsSpace: Array<stockObject>;
  public spaces: Array<space>;

  public stock: Array<stockObject>;

  constructor(private http: HttpClient){
    this.campusName = '';
    this.direction = '';
    this.city = '';
    this.department = '';
    this.description = '';
    this.spaceFee = 0;
    this.selectedSchedule = 'Lunes'
    this.schedule = [
      { dia: 'Lunes', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
      { dia: 'Martes', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
      { dia: 'Miércoles', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
      { dia: 'Jueves', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
      { dia: 'Viernes', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
      { dia: 'Sábado', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' },
      { dia: 'Domingo', firstOpen: '', firstClose: '', secondOpen: '', secondClose: '' }
    ];

    this.countSpace = 1;
    this.spaceName = '';
    this.spaceDescription = '';
    this.objsSpace = [];
    this.spaces = [];

    this.stock = [
      {id: 0, name: 'Silla 1', type: 'Mueble', description: 'Blanca', price: 120},
      {id: 1, name: 'Silla 2', type: 'Mueble', description: 'Blanca', price: 120},
      {id: 2, name: 'Silla 3', type: 'Mueble', description: 'Blanca', price: 120},
      {id: 3, name: 'Silla 4', type: 'Mueble', description: 'Blanca', price: 120},
      {id: 4, name: 'Silla 5', type: 'Mueble', description: 'Blanca', price: 120},
    ];
  }

  ngOnInit() {
    //this.changeDay(this.selectedSchedule);
    const space = document.querySelector('#space') as HTMLElement;
    space.style.display = 'none';

  }

  validationInfo(){
    const body = document.querySelector('#modal-body') as HTMLElement;
    const modal = document.querySelector('#infoModal') as HTMLElement;
    const bootstrapModal = new bootstrap.Modal(modal);

    const info : boolean = this.validationCampusInfo();
    const space : boolean = this.validationSpaceInfo();

    if(!info && !space){
      body.innerHTML = 'Para crear una nueva sede, es necesario que ingrese la información requerida en "Información Sede" y "Espacios"';
      bootstrapModal.show();
    }else{
      if(info){
        if(space){
          this.createCampus();
        }else{
          body.innerHTML = 'Es necesario completar toda la información requerida en "Espacios"';
          bootstrapModal.show();
        }
      }else{
        body.innerHTML = 'Es necesario completar toda la información requerida en "Información Sede"';
        bootstrapModal.show();
      }
    }

  }

  createCampus(){
    const decode_token: object = jwt_decode(JSON.stringify(localStorage.getItem('token')));
    if('infoUser' in decode_token){
      const infoUser = decode_token.infoUser as Array<object>;
      if('rol' in infoUser[0] && 'id_usuario' in infoUser[0]){
        const data = {
          headquater_name: this.campusName,
          description: this.description,
          city: this.city,
          address: this.direction,
          rol: infoUser[0].rol,
          id_user: infoUser[0].id_usuario
        };
        const url = 'http://localhost:3005/api/headquearters/create';
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        this.http.post(url, data, {headers}).subscribe(response => {
          if('message' in response){
            if(response.message === '0'){
              alert('entro')
            }else if(response.message === '1'){
              alert('no entro')
            }
            else{
              alert("No tiene permisos")
            }
          }
        });
      }
    }
  }

  validationCampusInfo(): boolean{
    let toReturn: boolean = true;
    const name = document.querySelector('#warn-name') as HTMLInputElement;
    const direction = document.querySelector('#warn-direction') as HTMLInputElement;
    const city = document.querySelector('#warn-city') as HTMLInputElement;
    const department = document.querySelector('#warn-department') as HTMLInputElement;
    const description = document.querySelector('#warn-description') as HTMLInputElement;
    const spaceList = document.querySelector('#warn-space-list') as HTMLInputElement;
    if(this.campusName == ''){
      name.style.display = '';
      toReturn = false;
    }else{
      name.style.display = 'none';
    }
    if(this.direction == ''){
      direction.style.display = '';
      toReturn = false;
    }else{
      direction.style.display = 'none';
    }
    if(this.city == ''){
      city.style.display = '';
      toReturn = false;
    }else{
      city.style.display = 'none';
    }
    if(this.department == ''){
      department.style.display = '';
      toReturn = false;
    }else{
      department.style.display = 'none';
    }
    if(this.description == ''){
      description.style.display = '';
      toReturn = false;
    }else{
      description.style.display = 'none';
    }
    if(this.spaces.length == 0){
      spaceList.style.display = '';
      toReturn = false;
    }else{
      spaceList.style.display = 'none';
    }
    return toReturn;
  }

  validationSpaceInfo(): boolean{
    let toReturn: boolean = true;
    const name = document.querySelector('#warn-space-name') as HTMLInputElement;
    const description = document.querySelector('#warn-space-desc') as HTMLInputElement;
    const fee = document.querySelector('#warn-space-fee') as HTMLInputElement;
    if(this.spaceName == ''){
      name.style.display = '';
      toReturn = false;
    }else{
      name.style.display = 'none';
    }
    if(this.spaceDescription == ''){
      description.style.display = '';
      toReturn = false;
    }else{
      description.style.display = 'none';
    }
    if(this.spaceFee == 0){
      fee.style.display = '';
      toReturn = false;
    }else{
      description.style.display = 'none';
    }
    return toReturn;
  }

  changeDay(value:string): void {
		this.selectedSchedule = value;
    const firstOpen = document.querySelector('#firstOpen') as HTMLInputElement;
    const secondOpen = document.querySelector('#secondOpen') as HTMLInputElement;
    const firstClose = document.querySelector('#firstClose') as HTMLInputElement;
    const secondClose = document.querySelector('#secondClose') as HTMLInputElement;
    const horario = this.schedule.find(h => h.dia === this.selectedSchedule);
    if(horario){
      firstOpen.value = horario.firstOpen;
      firstClose.value = horario.firstClose;
      secondOpen.value = horario.secondOpen;
      secondClose.value = horario.secondClose;
    }else{
      firstOpen.value = '';
      firstClose.value = '';
      secondOpen.value = '';
      secondClose.value = '';
    }
	}

  changeFirstSchedule(open: string, close: string){
    const horario = this.schedule.find(h => h.dia === this.selectedSchedule);
    if(horario){
      horario.firstOpen = open;
      horario.firstClose = close;
    }
  }

  changeSecondSchedule(open: string, close: string){
    const horario = this.schedule.find(h => h.dia === this.selectedSchedule);
    if(horario){
      horario.secondOpen = open;
      horario.secondClose = close;
    }
  }

  changePanel(option: number){
    const info = document.querySelector('#info') as HTMLElement;
    const space = document.querySelector('#space') as HTMLElement;
    const miSelect = document.querySelector('#selectObjSpace') as HTMLSelectElement;
    if(option === 0){
      info.style.display = '';
      space.style.display = 'none';
    }else if(option === 1){
      info.style.display = 'none';
      space.style.display = '';
      this.setObjsInSpace('Mueble');
      miSelect.value = 'Mueble';
    }
  }

  deleteObjStock(id: number, selectValue: string){
    let indice: number | undefined = undefined;
    this.objsSpace.forEach(n => {
      if(n.id === id){
        indice = this.objsSpace.findIndex(obj => obj.id == id);
        this.stock.push(n);
      }
    });
    if(indice != undefined){
      this.objsSpace.splice(indice, 1);
    }
    this.setObjsInSpace(selectValue);
    this.sortListStock();
    this.setObjsInSpace(selectValue);
  }

  deleteSpace(id: number, selectValue: string){
    let indice: number | undefined = undefined;
    this.spaces.forEach(n => {
      if(n.id === id){
        indice = this.spaces.findIndex(obj => obj.id == id);
        n.stock.forEach(s => {
          this.stock.push(s);
        });
      }
    });
    if(indice != undefined){
      this.spaces.splice(indice, 1);
    }
    this.setObjsInSpace(selectValue);
    this.sortListStock();
    this.setObjsInSpace(selectValue);
  }

  sortListStock(){
    this.stock.sort((a, b) => a.id - b.id);
  }

  setObjsInSpace(value: string){
    const miSelect = document.querySelector('#objSpaceSelect') as HTMLSelectElement;
    miSelect.innerHTML = '';
    this.stock.forEach(n => {
      if(n.type === value){
        const elementOption = document.createElement('option');
        elementOption.textContent = n.id + " - " + n.name;
        elementOption.id = n.id.toString();
        miSelect.appendChild(elementOption);
      }
    });

  }

  addObjToSpace(value: string, selectValue: string){
    const result = value.split(' - ');
    let indice: number | undefined = undefined;
    this.stock.find(n => {
      if(n.id.toString() == result[0]){
        indice = this.stock.findIndex(obj => obj.id.toString() == result[0]);
        this.objsSpace.push({ id: n.id,name: n.name, type: n.type, description: n.description, price: n.price});
      }
    });
    if(indice != undefined){
      this.stock.splice(indice, 1);
    }
    this.setObjsInSpace(selectValue);
  }

  addSpace(){
    if(this.validationSpaceInfo()){
      let newSpace: space = { id: this.countSpace, name: this.spaceName, fee: this.spaceFee, description: this.spaceDescription, stock: []};
      newSpace.stock = this.objsSpace;
      this.spaces.push(newSpace);
      this.objsSpace = [];
      this.countSpace++;
    }else{
      const body = document.querySelector('#modal-body') as HTMLElement;
      const modal = document.querySelector('#infoModal') as HTMLElement;
      const bootstrapModal = new bootstrap.Modal(modal);
      body.innerHTML = 'Verifique que la información requerida para crear un espacio este completa';
      bootstrapModal.show();
    }
  }
}
