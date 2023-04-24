import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

interface Stock{
  description: string,
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
  public stockList: Iterable<Stock> | undefined;

  private ngOnInit(){
    this.loadStockList();
  }

  constructor(private http: HttpClient){
    this.stockList = undefined;
  }

  private loadStockList(): void{
    
  }


}
