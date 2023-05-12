import { Component } from '@angular/core';

interface Booking{
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

  public booking_list: Array<Booking> | undefined;

  constructor(){
    this.booking_list = this.getBookingList();
  }

  private getBookingList(): Array<Booking>{
    return new Array<Booking>;
  }

}
