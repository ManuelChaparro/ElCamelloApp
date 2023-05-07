import { Component } from '@angular/core';

interface Booking{
  idBooking: number,
  idBill: number,
  idSpace: number,
  idUser: number,
  initDate: string,
  finalDate: string,
  note: string
}

@Component({
  selector: 'app-bookingslist',
  templateUrl: './bookingslist.component.html',
  styleUrls: ['./bookingslist.component.css']
})
export class BookingslistComponent {

  public booking_list: Array<Booking>;
  public booking_id_list: Array<Iterable<any>> | undefined;
  public idBookingToDelete: number | undefined;

  constructor(){
    this.booking_list = [];
    this.booking_id_list = [];
    this.idBookingToDelete = undefined;
  }

}
