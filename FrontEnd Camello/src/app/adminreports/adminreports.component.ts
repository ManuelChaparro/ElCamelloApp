import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RoutesListService } from '../routes-list.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminreports',
  templateUrl: './adminreports.component.html',
  styleUrls: ['./adminreports.component.css']
})
export class AdminreportsComponent{

  frame: number;
  data: any[];

  //Grafico de Pastel
  view: [number, number] = [1000, 300];
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  titleGraphic: string;

  //Grafico de barras
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  //Compartidas
  gradient = false;
  showLegend = true;


  constructor(private routesList: RoutesListService,
    private http: HttpClient) {
    this.titleGraphic = "";
    this.frame = 0;
    this.data = [];
    Object.assign(this.data);
  }

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}

  public getBookingPerMonth(): void{
    this.getFetch(this.routesList.getBookingPerMonth())
    .then(res => this.data = res)
    .catch(rej => console.log(rej)
    );
    this.titleGraphic = "Ganancias por Sede";
    this.xAxisLabel = "Meses"
    this.yAxisLabel = "Reservas"
    this.frame = 2;
  }

  public moneyPerCampus(): void{
    this.getFetch(this.routesList.getMoneyPerHeadquarter())
    .then(res => this.data = res)
    .catch(rej => console.log(rej)
    );
    this.titleGraphic = "Ganancias por Sede";
    this.frame = 1;
  }

  public spacesPerCampus(): void{
    this.getFetch(this.routesList.getSpacesPerHeadquarter())
    .then(res => this.data = res)
    .catch(rej => console.log(rej)
    );
    this.titleGraphic = "Ganancias por Sede";
    this.frame = 1;
  }

  public getClientQuantityPerHeadquarter(): void{
    this.getFetch(this.routesList.getClientQuantityPerHeadquarter())
    .then(res => this.data = res)
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
          res(response as Array<any>);
        }
      });
    });
  }

  setFrame(frame: number): void{
    this.frame = frame;
  }
}
