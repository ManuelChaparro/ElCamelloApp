import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RoutesListService } from '../routes-list.service';
import * as bootstrap from 'bootstrap';
import { formatDate } from '@angular/common';

interface Booking{
  booking_id: number,
  space_id: number,
  client_id: number,
  date_booking: string,
  hour_start: string,
  hour_end: string,
  note: string
}

@Component({
  selector: 'app-bookingslist',
  templateUrl: './bookingslist.component.html',
  styleUrls: ['./bookingslist.component.css']
})
export class BookingslistComponent {
  public campus_list: Array<any>;
  public booking_list: Array<Booking>;
  public bookingsPerCampus: Array<Booking>;
  public view: number;
  private bookingIdToDelete: number;
  private campusIdSelected: number;
  public bookingToModify: Booking;
  public usersList: Array<any> | undefined;
  public campusList: Array<any> | undefined;
  public spacesList: Array<any> | undefined;
  public actualDate: string;
  public actualHour: string;

  constructor(private http: HttpClient, private routesList: RoutesListService){
    this.actualDate = this.getMinDate();
    this.actualHour = this.getMinHour();
    this.booking_list = [];
    this.campus_list = [];
    this.bookingsPerCampus = [];
    this.view = 0;
    this.bookingIdToDelete = -1;
    this.campusIdSelected = -1;
    this.bookingToModify = {
      booking_id: -1,
      space_id: -1,
      client_id: -1,
      date_booking: "",
      hour_start: "",
      hour_end: "",
      note: ""
    };
    this.getCampusList();
    this.getBookingList();
    this.initUsersList();
    this.initCampusList().then(res => this.initSpaceList(res).then(res => this.setSpaceAndUserOnInit(res)));
  }

  public saveBookingChanges(): void{
    const url = this.routesList.getModifyBooking();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const data = {
      booking_id: this.bookingToModify.booking_id,
      space_id: this.bookingToModify.space_id,
      date_booking: this.bookingToModify.date_booking,
      hour_start: this.bookingToModify.hour_start,
      hour_end: this.bookingToModify.hour_end,
      note: this.bookingToModify.note
    }
    this.http.put(url, data, { headers }).subscribe((data) => {
      console.log(data);
    });
  }

  private setSpaceAndUserOnInit(res: any): void{
    if(this.spacesList){
      this.bookingToModify.space_id = this.spacesList[0].id_espacio;
    }
    if(this.usersList){
      this.bookingToModify.client_id = this.usersList[0].id_usuario;
    }
  }

  private async initUsersList(): Promise<any>{
    const url = this.routesList.getUserList();
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
      const url = this.routesList.getCampusList();
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      this.http.get(url, { headers }).subscribe((data) => {
        this.campusList = data as Array<any>;
        res(this.campusList[0].id_sede);
      });
    });

  }

  validateTime(event: Event) {
    const timeInput = event.target as HTMLInputElement;
    const selectedTime = timeInput.value.split(':');
    const minutes = parseInt(selectedTime[1]);
    if (minutes % 15 !== 0) {
      const validMinutes = Math.round(minutes / 15) * 15;
      selectedTime[1] = validMinutes.toString().padStart(2, '0');
      timeInput.value = selectedTime.join(':');
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

  public setSpace(event: any): void{
    const selectedOptionId = event.target.value;
    const selectedOption = document.querySelector(`[value="${selectedOptionId}"]`);
    if (selectedOption) {
      const optionId = selectedOption.getAttribute('id') as any;
      this.bookingToModify.space_id = optionId as number;
    }
  }

  private async initSpaceList(id_campus: string): Promise<any>{
    return new Promise<any>((req, res) => {
      const url = this.routesList.getSpacesPerCampusList();
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      let data = {
        headquarter_id: id_campus
      }
      this.http.post(url, data, { headers }).subscribe((data) => {
        this.spacesList = data as Array<any>;
        this.bookingToModify.space_id = this.spacesList[0].id_espacio;
        req(true);
      });
    });
  }

  public loadUser(event: any): void{
    const selectedOptionId = event.target.value as string;
    this.bookingToModify.client_id = parseInt(selectedOptionId.split(" |")[0]);
  }

  public btnBkngModify(bookingToModify: Booking): void{
    this.bookingToModify = bookingToModify;
    this.view = 2;
    console.log(this.bookingToModify);

  }

  public loadBookings(campusId: number): void{
    this.bookingsPerCampus = [];
    this.campusIdSelected = campusId;
    const url = this.routesList.getSpacesPerCampusList();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const data = {
      headquarter_id: campusId
    }
    this.http.post(url, data, { headers }).subscribe((response) => {
      const spaces = response as Array<any>;
      let spacesId: Array<number> = [];
      spaces.forEach((space) => {
        spacesId.push(space.id_espacio);
      });
      this.bookingsPerCampus = this.booking_list.filter((booking) => spacesId.includes(booking.space_id));
      if(this.bookingsPerCampus.length != 0){
        this.view = 1;
      }else{
        const modal = document.querySelector('#infoModal') as HTMLElement;
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    });
  }

  public deleteBooking(): void{
    const url = this.routesList.getDeleteBooking();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    const data = {
      booking_id: this.bookingIdToDelete
    }
    this.http.post(url, data, { headers }).subscribe((response) => {
      if('message' in response){
        if(response.message === '0'){
          this.bookingsPerCampus = this.bookingsPerCampus.filter((booking) => booking.booking_id != this.bookingIdToDelete);
          this.booking_list = this.booking_list.filter((booking) => booking.booking_id != this.bookingIdToDelete);
          this.bookingIdToDelete = -1;
        }
      }

    });
  }

  public modalDelete(bookingId: number): void{
    const modal = document.querySelector('#modalDelete') as HTMLElement;
    const spanDelete = document.querySelector('#modalDeleteValue') as HTMLElement;
    spanDelete.innerHTML = bookingId.toString();
    this.bookingIdToDelete = bookingId;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  }

  public changeView(view: number): void{
    this.view = view;
  }

  private async getCampusList(): Promise<boolean>{
    return new Promise<boolean>((res, rej) => {
      const url = this.routesList.getCampusList();
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      this.http.get(url, { headers }).subscribe((response) => {
        this.campus_list = response as Array<any>;
      });
    });
  };

  private async getBookingList(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const url = this.routesList.getBookingList();
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      this.http.get(url, { headers }).subscribe((response) => {
          const data = response as Array<any>;
          data.forEach((booking) => {
            const date = booking.fecha as string;
            let bookingToAdd: Booking = {
              booking_id: booking.id_reserva,
              space_id: booking.id_espacio,
              client_id: booking.id_usuario,
              date_booking: date.slice(0,10),
              hour_start: booking.hora_entrada,
              hour_end: booking.hora_salida,
              note: booking.notas,
            };
            this.booking_list?.push(bookingToAdd);
          });
          resolve(true);
        },
        (error) => {
          console.error(error);
          resolve(false);
        }
      );
    });
  }

}
