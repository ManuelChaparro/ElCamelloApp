import { Component } from '@angular/core';
import { RoutesListService } from '../routes-list.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as bootstrap from 'bootstrap';
import jwt_decode from 'jwt-decode';

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
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent {

  public bookingList: Array<Booking>;
  private bookingIdToDelete: number;

  constructor(private http: HttpClient, private routesList: RoutesListService){
    this.bookingList = [];
    this.bookingIdToDelete = -1;
    this.setList();
  }

  public modalDelete(bookingId: number): void{
    const modal = document.querySelector('#modalDelete') as HTMLElement;
    const spanDelete = document.querySelector('#modalDeleteValue') as HTMLElement;
    spanDelete.innerHTML = bookingId.toString();
    this.bookingIdToDelete = bookingId;
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
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
          this.bookingList = this.bookingList.filter((booking) => booking.booking_id != this.bookingIdToDelete);
          const notification = document.querySelector('#deleteBkngNtf') as HTMLElement;
          const notification_name = document.querySelector('#deleteBookingSpan') as HTMLSpanElement;
          notification_name.innerText = this.bookingIdToDelete.toString();
          notification.classList.add('show');
          setTimeout(() => {
            notification.classList.remove('show');
          }, 5000);
          this.bookingIdToDelete = -1;
        }
      }

    });
  }

  private setList(): void{
    const decode_token: object = jwt_decode(JSON.stringify(localStorage.getItem('token')));
    if('infoUser' in decode_token){
      const infoUser =  decode_token.infoUser as Array<object>;
      if('id_usuario' in infoUser[0]){
        const data ={
          client_id: infoUser[0].id_usuario
        }
        this.post(this.routesList.getBookingListWithIdClient(), data)
        .then(res => {
          const data = res as Array<any>;
          data.forEach(booking => {
            const newBooking: Booking = {
              booking_id: booking.id_reserva,
              space_id: booking.id_espacio,
              client_id: booking.id_usuario,
              date_booking: booking.fecha.split("T")[0],
              hour_start: booking.hora_entrada,
              hour_end: booking.hora_salida,
              note: booking.notas
            }
            this.bookingList.push(newBooking);
          });
        })
        .catch(rej => {
          console.log(rej);
        });
      }
    }
  }

  private post(url: string, data: Object):Promise<any>{
    return new Promise<any>((res, rej) => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      });
      this.http.post(url, data, {headers}).subscribe(response => {
        if(response){
          res(response);
        }else{
          rej("Error al realizar la consulta");
        }
      });
    });
  }

}
