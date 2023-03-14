import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';

const appRoutes:Routes=[
  {path:'login', component:LoginComponent},
  {path:'createUser', component:CreateUserComponent},
  {path:'adminHome', component:AdminHomeComponent},
  {path:'home', component:HomeComponent},
  {path:'recoverPass', component:RecoverPassComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HomeComponent,
    AdminHomeComponent,
    RecoverPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
