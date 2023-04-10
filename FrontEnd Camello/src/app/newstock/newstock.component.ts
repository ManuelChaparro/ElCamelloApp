import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';


interface stockObject{
  id: number,
  name: string,
  type: string,
  description: string,
  price: number
}



@Component({
  selector: 'app-newstock',
  templateUrl: './newstock.component.html',
  styleUrls: ['./newstock.component.css']
})
export class NewstockComponent {

  public countObjs: number;
  public stockName: string;
  public stockType: string;
  public stockDescription: string;
  public stockPrice: number | undefined;
  public listStock: Array<stockObject>;

  constructor(){
    this.countObjs = 1;
    this.stockName = '';
    this.stockType = 'Mueble';
    this.stockDescription = '';
    this.stockPrice = undefined;
    this.listStock = [];
  }

  addObjToStock(){
    if(this.validations()){
      this.listStock?.push({ id: this.countObjs,name: this.stockName, type: this.stockType, description: this.stockDescription, price: this.stockPrice as number});
      this.countObjs++;
      this.clearInputs();
    }else{
      const modal = document.querySelector('#myModal') as HTMLElement;
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  clearInputs(){
    const name = document.querySelector('#stock-name') as HTMLInputElement;
    const description = document.querySelector('#stock-description') as HTMLInputElement;
    const price = document.querySelector('#stock-price') as HTMLInputElement;
    name.value = '';
    description.value = '';
    price.value = '';
  }

  validations(): boolean{
    let toReturn: boolean = true;
    const labelName = document.querySelector('#warn-name') as HTMLElement;
    const labelDescription = document.querySelector('#warn-description') as HTMLElement;
    const labelPrice = document.querySelector('#warn-price') as HTMLElement;
    if(this.stockName == ''){
      labelName.style.display = '';
      toReturn = false;
    }
    if(this.stockDescription == ''){
      labelDescription.style.display = '';
      toReturn = false;
    }
    if(this.stockPrice == 0 || this.stockPrice === undefined){
      labelPrice.style.display = '';
      toReturn = false;
    }
    return toReturn;
  }

  deleteObjList(id: number){
    let indice: number = this.listStock.findIndex(obj => obj.id == id);
    if(indice != undefined){
      this.listStock.splice(indice, 1);
    }
    this.sortListStock();
  }

  verifyInput(value: number){
    const labelName = document.querySelector('#warn-name') as HTMLElement;
    const labelDescription = document.querySelector('#warn-description') as HTMLElement;
    const labelPrice = document.querySelector('#warn-price') as HTMLElement;
    if(value === 0){
      if(this.stockName != ''){
        labelName.style.display = 'none';
      }
    }else if(value === 1){
      if(this.stockDescription != ''){
        labelDescription.style.display = 'none';
      }
    }else{
      if(this.stockPrice != 0){
        labelPrice.style.display = 'none';
      }
    }
  }

  sortListStock(){
    this.listStock.sort((a, b) => a.id - b.id);
  }

  changeStockType(value:string): void{
    this.stockType = value;
  }





}
