import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.css']
})
export class NewbookingComponent {

  public usersList: Array<any> | undefined;
  public campusList: Array<any> | undefined;
  public actualDate: string;

  constructor(private http: HttpClient){
    this.actualDate = this.getMinDate();
  }

  ngOnInit(){
    this.initUsersList();
    this.initCampusList().then(res => this.initSpaceList(res));
  }

  private getMinDate(): string {
    const actualDate = new Date();
    return formatDate(actualDate, 'yyyy-MM-dd', 'en-US');
  }

  private async initSpaceList(campus: Object): Promise<any>{
    console.log(campus);

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
        res(this.campusList[0]);
      });
    });

  }

}
