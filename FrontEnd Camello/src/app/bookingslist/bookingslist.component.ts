import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RoutesListService } from '../routes-list.service';
import * as bootstrap from 'bootstrap';

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

  constructor(private http: HttpClient, private routesList: RoutesListService){
    this.booking_list = [];
    this.campus_list = [];
    this.bookingsPerCampus = [];
    this.view = 0;
    this.bookingIdToDelete = -1;
    this.campusIdSelected = -1;
    this.getCampusList();
    this.getBookingList();
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
