import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphicsDataServiceService {

  private data: Array<any>;

  constructor() {
    this.data = [];
   }

   setData(data: Array<any>){
    this.data = data;
   }

   getData(): Array<any>{
    return this.data;
   }
}
