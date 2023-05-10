import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import * as bootstrap from 'bootstrap';

interface Booking{
  space_id: number,
  client_id: number,
  date_booking: string,
  hour_start: string,
  hour_end: string,
  note: string
}

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.css']
})
export class NewbookingComponent {

  public usersList: Array<any> | undefined;
  public campusList: Array<any> | undefined;
  public spacesList: Array<any> | undefined;
  public bookingData: Booking;
  public actualDate: string;
  public actualHour: string;

  constructor(private http: HttpClient){
    this.actualDate = this.getMinDate();
    this.actualHour = this.getMinHour();
    this.bookingData = {
      space_id: 0,
      client_id: 0,
      date_booking: "",
      hour_start: "",
      hour_end: "",
      note: ""
    }
  }

  ngOnInit(){
    this.initUsersList();
    this.initCampusList().then(res => this.initSpaceList(res).then(res => this.setSpaceAndUserOnInit(res)));
  }

  private showNotification(): void{
    const notification = document.querySelector('#notification') as HTMLElement;
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 5000);
  }

  public setSpace(event: any): void{
    const selectedOptionId = event.target.value;
    const selectedOption = document.querySelector(`[value="${selectedOptionId}"]`);
    if (selectedOption) {
      const optionId = selectedOption.getAttribute('id') as any;
      this.bookingData.space_id = optionId as number;
    }
  }

  public loadUser(event: any): void{
    const selectedOptionId = event.target.value as string;
    this.bookingData.client_id = parseInt(selectedOptionId.split(" |")[0]);
  }

  public async createBooking(): Promise<any>{
    if(this.bookingData.date_booking != "" && this.bookingData.hour_start != "" && this.bookingData.hour_end != ""){
      const url = 'http://localhost:3005/api/booking/make';
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      const data = {
        space_id: this.bookingData.space_id,
        client_id: this.bookingData.client_id,
        date_booking: this.bookingData.date_booking,
        hour_start: this.bookingData.hour_start,
        hour_end: this.bookingData.hour_end,
        note: this.bookingData.note
      }
      this.http.post(url, data, { headers }).subscribe((data) => {
        if("message" in data){
          if(data.message === "3"){
          }else if(data.message === "4"){
            alert("Error al crear la reserva")
          }else if(data.message === "0"){
            this.showNotification();
          }
        }
      });
    }else{
      alert("Faltan datos")
    }
  }

  private getMinDate(): string {
    const actualDate = new Date();
    return formatDate(actualDate, 'yyyy-MM-dd', 'en-US');
  }

  private getMinHour(): string {
    const actualDate = new Date();
    return actualDate.toISOString().substring(11, 16);
  }

  public loadSpaces(event: any): void{
    const selectedOptionId = event.target.value;
    const selectedOption = document.querySelector(`[value="${selectedOptionId}"]`);
    if (selectedOption) {
      const optionId = selectedOption.getAttribute('id') as string;
      this.initSpaceList(optionId);
    }
  }

  private async initSpaceList(id_campus: string): Promise<any>{
    return new Promise<any>((req, res) => {
      const url = 'http://localhost:3005/api/spaces/list/headquarter';
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      let data = {
        headquarter_id: id_campus
      }
      this.http.post(url, data, { headers }).subscribe((data) => {
        this.spacesList = data as Array<any>;
        req(true);
      });
    });
  }

  private setSpaceAndUserOnInit(res: any): void{
    if(this.spacesList){
      this.bookingData.space_id = this.spacesList[0].id_espacio;
    }
    if(this.usersList){
      this.bookingData.client_id = this.usersList[0].id_usuario;
    }
  }

  private async initUsersList(): Promise<any>{
    const url = 'http://localhost:3005/api/user/list';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    await this.http.get(url, { headers }).subscribe((data) => {
      const userResponse = data as Array<any>;
      this.usersList = userResponse.filter((user) => user.rol != "A");
    });
  }

  private initCampusList(): Promise<any>{
    return new Promise<any>((res, rej) => {
      const url = 'http://localhost:3005/api/headquarters/list';
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      this.http.get(url, { headers }).subscribe((data) => {
        this.campusList = data as Array<any>;
        res(this.campusList[0].id_sede);
      });
    });

  }

}
