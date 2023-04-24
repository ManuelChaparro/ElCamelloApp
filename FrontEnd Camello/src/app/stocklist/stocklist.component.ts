import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';

interface Stock{
  name: string,
  listProducts: Product[]
}

interface Product{
  name: string,
  brand: string,
  type: string,
  price: number
}

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent {
  public stockList: Array<Stock> | undefined;

  ngOnInit(){
    this.loadStockList();
  }

  constructor(private http: HttpClient){
    this.stockList = undefined;
  }

  private loadStockList(): void{
    const decode_token: object = jwt_decode(JSON.stringify(localStorage.getItem('token')));
    if('infoUser' in decode_token){
      const infoUser =  decode_token.infoUser as Array<object>;
      if('rol' in infoUser[0]){
        const url = 'http://localhost:3005/api/inventary/list';
        const rol = infoUser[0].rol as string
        const data = {
          rol: rol,
        };
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        this.http.post(url, data, {headers}).subscribe(response => {
          this.addListProducts(response as Array<any>, rol);
        });
      }
    }
  }

  private addListProducts(stock: Array<any>, rol: string): void{
    stock.forEach(stock => {
      const newStock: Stock = {name: stock.nombre_sede, listProducts: []};
      
    });

  }
}
