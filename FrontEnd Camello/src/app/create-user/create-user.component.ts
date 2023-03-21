import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {
  public name: string;
  public surname: string;
  public number: number|undefined;
  public email: string;
  public gender: string;
  public password: string;
  public confirm_pass: string;
  public document_type: string;
  public document: number|undefined;
  public birthdate: string;

  constructor(private router: Router, private http: HttpClient){
    this.name = '';
    this.surname = '';
    this.number = undefined;
    this.email = '';
    this.gender = 'Masculino';
    this.password = '';
    this.confirm_pass= '';
    this.document_type = 'Cédula de Ciudadanía';
    this.document = undefined;
    this.birthdate = '';
  }

  public registerUser() {
    this.validations();
  }

  public validations(){
    const v_email = this.validationEmail();
    const v_pass = this.validationPass();
    const v_birthdate = this.validationBirthdate();
    const v_data_empty = this.validateInputs();
    alert(1)
    this.httpPostRequest();
    if(v_email && v_pass && v_birthdate && v_data_empty){

    }
  }

  public validateInputs(){
    const warn_name = document.querySelector('.warn_name') as HTMLElement;
    const warn_surname = document.querySelector('.warn_surname') as HTMLElement;
    const warn_phone = document.querySelector('.warn_phone') as HTMLElement;
    const warn_doc = document.querySelector('.warn_doc') as HTMLElement;
    if(this.name == ''){
      warn_name.style.display = 'flex';
    }else{
      warn_name.style.display = 'none';
      if(this.surname == ''){
        warn_surname.style.display = 'flex';
      }else{
        warn_surname.style.display = 'none';
        if(this.number == undefined){
          warn_phone.style.display = 'flex';
        }else{
          warn_phone.style.display = 'none';
          if(this.document == undefined){
            warn_doc.style.display = 'flex';
          }else{
            warn_doc.style.display = 'none';
            return true;
          }
        }
      }
    }
    return false;
  }

  public validationBirthdate(){
    const warn_birth = document.querySelector('.warn_birth') as HTMLElement;
    if(this.birthdate == ''){
      warn_birth.style.display = 'flex';
      return true;
    }else{
      warn_birth.style.display = 'none';
      return false;
    }
  }

  public httpPostRequest(){
    const url = 'http://localhost:3005/api/user/register';
    const data = {
      nombres: this.name,
      apellidos: this.surname,
      fecha_nacimiento: this.birthdate,
      email: this.email,
      genero: this.gender,
      tipo_documento: this.document_type,
      identificacion: this.document,
      telefono: this.number,
      rol: "C",
      password: this.password
    };

    if(data.tipo_documento == 'Cédula de Ciudadanía'){
      data.tipo_documento = 'C.C';
    }else if(data.tipo_documento == 'Tarjeta de Identidad'){
      data.tipo_documento = 'T.I';
    }else{
      data.tipo_documento = 'C.E';
    }

    console.log(data);

    this.http.post(url, data).subscribe(response => {
      console.log(response);

      if('message' in response){
        if(response.message == 'Se ha insertado correctamente los datos'){
          this.router.navigate(['/login']);
        }else{
          alert("El email ya se encuentra registrado");
        }
      }
    });
  }

  public validationEmail(){
    const warn_email = document.querySelector('.warn_email') as HTMLElement;
    const email_test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email_test.test(this.email)){
      warn_email.style.display = 'none';
      return true;
    }else{
      warn_email.style.display = 'flex';
      return false;
    }
  }

  public validationPass(){
    const warn_pass = document.querySelector('.warn_pass') as HTMLElement;
    const warn_con_pass = document.querySelector('.warn_con_pass') as HTMLElement;
    if(this.password.length < 8){
      warn_pass.style.display = 'flex';
    }else{
      warn_pass.style.display = 'none';
      if(this.password != this.confirm_pass){
        warn_con_pass.style.display = 'flex';
      }else{
        warn_con_pass.style.display = 'none';
        return true;
      }
    }
    return false;
  }

  changeGender(value:string): void {
		this.gender = value;
	}

  changeDocType(value:string): void {
		this.document_type = value;
	}

  validateUser(){
    this.registerUser();
  }

  onOptionId(){
    const divIdentification = document.querySelector('#div-identification') as HTMLElement;
    const divCredential = document.querySelector('#div-credential') as HTMLElement;
    const divPersonalInfo = document.querySelector('#div-personalinfo') as HTMLElement;
    const divDate = document.querySelector('#div-date') as HTMLElement;

    divIdentification.style.display = 'flex';
    divCredential.style.display = 'none';
    divPersonalInfo.style.display = 'none';
    divDate.style.display = 'none';
  }

  onOptionCr(){
    const divIdentification = document.querySelector('#div-identification') as HTMLElement;
    const divCredential = document.querySelector('#div-credential') as HTMLElement;
    const divPersonalInfo = document.querySelector('#div-personalinfo') as HTMLElement;
    const divDate = document.querySelector('#div-date') as HTMLElement;
    divIdentification.style.display = 'none';
    divCredential.style.display = 'flex';
    divPersonalInfo.style.display = 'none';
    divDate.style.display = 'none';
  }

  onOptionPi(){
    const divIdentification = document.querySelector('#div-identification') as HTMLElement;
    const divCredential = document.querySelector('#div-credential') as HTMLElement;
    const divPersonalInfo = document.querySelector('#div-personalinfo') as HTMLElement;
    const divDate = document.querySelector('#div-date') as HTMLElement;
    divIdentification.style.display = 'none';
    divCredential.style.display = 'none';
    divPersonalInfo.style.display = 'flex';
    divDate.style.display = 'flex';
  }

}

window.addEventListener("resize", validateScreenSize);

function validateScreenSize() {
  const divIdentification = document.querySelector('#div-identification') as HTMLElement;
  const divCredential = document.querySelector('#div-credential') as HTMLElement;
  const divPersonalInfo = document.querySelector('#div-personalinfo') as HTMLElement;
  const divDate = document.querySelector('#div-date') as HTMLElement;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  if(screenWidth>= 800){
    divIdentification.style.display = 'flex';
    divCredential.style.display = 'flex';
    divPersonalInfo.style.display = 'flex';
    divDate.style.display = 'flex';
  }else{
    divIdentification.style.display = 'flex';
    divCredential.style.display = 'none';
    divPersonalInfo.style.display = 'none';
    divDate.style.display = 'none';
  }
}
