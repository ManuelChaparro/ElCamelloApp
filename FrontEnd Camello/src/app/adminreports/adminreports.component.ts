import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraphicsDataServiceService } from '../graphics-data-service.service';
import { RoutesListService } from '../routes-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminreports',
  templateUrl: './adminreports.component.html',
  styleUrls: ['./adminreports.component.css']
})
export class AdminreportsComponent {

  frame: number;
  data: any[];
  view: [number, number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  titleGraphic: string;

  constructor(private routesList: RoutesListService,
    private http: HttpClient) {
    this.titleGraphic = "";
    this.frame = 0;
    this.data = [
      {
        "name": "Germany",
        "value": 8940000
      },
      {
        "name": "USA",
        "value": 5000000
      }
    ];
    console.log(this.data);

    Object.assign(this.data);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  public moneyPerCampus(): void{
    this.getFetch(this.routesList.getMoneyPerHeadquarter())
    .then()
    .catch(rej => console.log(rej)
    );
    this.titleGraphic = "Ganancias por Sede";
    this.frame = 1;
  }

  async getFetch(url: string): Promise<Array<any>>{
    return new Promise<Array<any>>((res, rej) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      this.http.get(url, { headers }).subscribe((response) => {
        if('message' in response){
          rej("Ocurrio un error al cargar los datos...");
        }else{
          console.log(response as Array<any>);

          res(response as Array<any>);
        }
      });
    });
  }

  setFrame(frame: number): void{
    this.frame = frame;
  }
}
