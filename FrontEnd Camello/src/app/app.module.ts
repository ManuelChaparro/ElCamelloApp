import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminusersComponent } from './adminusers/adminusers.component';
import { AdmincampusComponent } from './admincampus/admincampus.component';
import { AdminbookingsComponent } from './adminbookings/adminbookings.component';
import { AdminreportsComponent } from './adminreports/adminreports.component';
import { CampusComponent } from './campus/campus.component';
import { BookingsComponent } from './bookings/bookings.component';
import { NewcampusComponent } from './newcampus/newcampus.component';
import { CampuslistComponent } from './campuslist/campuslist.component';

const appRoutes:Routes=[
  {path:'login', component:LoginComponent},
  {path:'createUser', component:CreateUserComponent},
  {path:'home', component:HomeComponent},
  {path:'recoverPass', component:RecoverPassComponent},
  {path:'adminHome', component:AdminhomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HomeComponent,
    RecoverPassComponent,
    AdminhomeComponent,
    AdminusersComponent,
    AdmincampusComponent,
    AdminbookingsComponent,
    AdminreportsComponent,
    CampusComponent,
    BookingsComponent,
    NewcampusComponent,
    CampuslistComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
