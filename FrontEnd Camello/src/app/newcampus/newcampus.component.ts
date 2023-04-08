import { Component } from '@angular/core';

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

  public countObjs: number;
  public stockName: string;
  public stockType: string;
  public stockDescription: string;
  public stockPrice: number;
  public listStock: Array<stockObject>;

  public countSpace: number;
  public spaceName: string;
  public spaceDescription: string;
  public objsSpace: Array<stockObject>;
  public spaces: Array<space>;


  constructor(){
    this.campusName = '';
    this.direction = '';
    this.city = '';
    this.department = '';
    this.description = '';
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

    this.countObjs = 1;
    this.stockName = '';
    this.stockType = 'Mueble';
    this.stockDescription = '';
    this.stockPrice = 0;
    this.listStock = [];

    this.countSpace = 1;
    this.spaceName = '';
    this.spaceDescription = '';
    this.objsSpace = [];
    this.spaces = [];
  }

  ngOnInit() {
    this.changeDay(this.selectedSchedule);
    const stock = document.querySelector('#stock') as HTMLElement;
    const space = document.querySelector('#space') as HTMLElement;
    stock.style.display = 'none';
    space.style.display = 'none';
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
    const stock = document.querySelector('#stock') as HTMLElement;
    const space = document.querySelector('#space') as HTMLElement;
    const miSelect = document.querySelector('#selectObjSpace') as HTMLSelectElement;
    if(option === 0){
      info.style.display = '';
      stock.style.display = 'none';
      space.style.display = 'none';
    }else if(option === 1){
      info.style.display = 'none';
      stock.style.display = '';
      space.style.display = 'none';
    }else{
      info.style.display = 'none';
      stock.style.display = 'none';
      space.style.display = '';
      this.setObjsInSpace('Mueble');
      miSelect.value = 'Mueble';
    }
  }

  addObjToStock(){
    this.listStock?.push({ id: this.countObjs,name: this.stockName, type: this.stockType, description: this.stockDescription, price: this.stockPrice});
    this.countObjs++;
  }

  deleteObjList(id: number){
    let indice: number = this.listStock.findIndex(obj => obj.id == id);
    if(indice != undefined){
      this.listStock.splice(indice, 1);
    }
    this.sortListStock();
  }

  deleteObjStock(id: number, selectValue: string){
    let indice: number | undefined = undefined;
    this.objsSpace.forEach(n => {
      if(n.id === id){
        indice = this.objsSpace.findIndex(obj => obj.id == id);
        this.listStock.push(n);
      }
    });
    if(indice != undefined){
      this.objsSpace.splice(indice, 1);
    }
    this.sortListStock();
    this.setObjsInSpace(selectValue);
  }

  deleteSpace(id: number, selectValue: string){
    let indice: number | undefined = undefined;
    this.spaces.forEach(n => {
      if(n.id === id){
        indice = this.spaces.findIndex(obj => obj.id == id);
        n.stock.forEach(s => {
          this.listStock.push(s);
        });
      }
    });
    if(indice != undefined){
      this.spaces.splice(indice, 1);
    }
    this.sortListStock();
    this.setObjsInSpace(selectValue);
  }

  sortListStock(){
    this.listStock.sort((a, b) => a.id - b.id);
  }

  changeStockType(value:string): void{
    this.stockType = value;
  }

  setObjsInSpace(value: string){
    const miSelect = document.querySelector('#objSpaceSelect') as HTMLSelectElement;
    miSelect.innerHTML = '';
    this.listStock.forEach(n => {
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
    this.listStock.find(n => {
      if(n.id.toString() == result[0]){
        indice = this.listStock.findIndex(obj => obj.id.toString() == result[0]);
        this.objsSpace.push({ id: n.id,name: n.name, type: n.type, description: n.description, price: n.price});
      }
    });
    if(indice != undefined){
      this.listStock.splice(indice, 1);
    }
    this.setObjsInSpace(selectValue);
  }

  addSpace(){
    let newSpace: space = { id: this.countSpace, name: this.spaceName, description: this.spaceDescription, stock: []};
    newSpace.stock = this.objsSpace;
    this.spaces.push(newSpace);
    this.objsSpace = [];
    this.countSpace++;
  }
}
