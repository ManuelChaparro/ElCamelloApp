import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-campuslist',
  templateUrl: './campuslist.component.html',
  styleUrls: ['./campuslist.component.css']
})
export class CampuslistComponent {

  ngOnInit(){
    this.loadCampusOnDatabase();
  }

  constructor(private http: HttpClient){
    
  }

  loadCampusOnDatabase(){
    const url = 'http://localhost:3005/api/headquarters/list';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    console.log(1);

    this.http.get(url, {headers}).subscribe(response => {
      console.log(1);
      console.log(response);

    });
  }

}
