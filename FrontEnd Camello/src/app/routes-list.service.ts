import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesListService {

  //Cuenta
  private login = 'http://localhost:3005/api/user/login';
  private changePass = 'http://localhost:3005/api/user/changepass';
  private recoverPass = 'http://localhost:3005/api/user/recovery';

  //Usuarios
  private createUser = 'http://localhost:3005/api/user/register';
  private deleteUser = 'http://localhost:3005/api/user/delete';
  private deleteUserAdmin = 'http://localhost:3005/api/user/ad/delete';
  private modifyUser = 'http://localhost:3005/api/user/modify';
  private validUser = 'http://localhost:3005/api/user/validUser';
  private searchUser = 'http://localhost:3005/api/user/search';
  private userList = 'http://localhost:3005/api/user/list';

  //Sedes
  private createCampus = 'http://localhost:3005/api/headquearters/create';
  private deleteCampus = 'http://localhost:3005/api/headquarters/delete';
  private campusList = 'http://localhost:3005/api/headquarters/list';
  private modifyCampus = 'http://localhost:3005/api/headquarters/modify';
  private departments = 'http://localhost:3005/api/headquarters/departments/list';
  private cities = 'http://localhost:3005/api/headquearters/cities/search';

  //Inventario
  private inventaryList = 'http://localhost:3005/api/inventary/list';
  private createInventory = 'http://localhost:3005/api/inventary/create';
  private searchInventory = 'http://localhost:3005/api/inventary/search';
  private createProduct = 'http://localhost:3005/api/inventary/product/add';
  private productList = 'http://localhost:3005/api/inventary/product/list';
  private deleteProduct = 'http://localhost:3005/api/inventary/product/delete';
  private filterProductByInventory = 'http://localhost:3005/api/inventary/product/filter';

  //Espacios
  private createSpace = 'http://localhost:3005/api/spaces/add';
  private quantitySpacesPerCampus = 'http://localhost:3005/api/headquarters/spaces/quantity';
  private spacesPerCampusList = 'http://localhost:3005/api/spaces/list/headquarter';

  //Horarios
  private createSchedule = 'http://localhost:3005/api/schedules/createSchedule';
  private deleteSchedule = 'http://localhost:3005/api/schedules/deleteSchedule';
  private scheduleCampus = 'http://localhost:3005/api/headquarters/searchSchedules';

  //Reservas
  private createBooking = 'http://localhost:3005/api/booking/make';

  getFilterProductByInventory(): string{
    return this.filterProductByInventory;
  }

  getInventaryList(): string{
    return this.inventaryList;
  }

  getRecoverPass(): string{
    return this.recoverPass;
  }

  getDeleteProduct(): string{
    return this.deleteProduct;
  }

  getSearchInventory(): string{
    return this.searchInventory;
  }

  getCreateProduct(): string{
    return this.createProduct;
  }

  getCreateSchedule(): string{
    return this.createSchedule;
  }

  getDeleteSchedule(): string{
    return this.deleteSchedule;
  }

  getCreateInventory(): string{
    return this.createInventory;
  }

  getCreateSpace(): string{
    return this.createSpace;
  }

  getCreateCampus(): string{
    return this.createCampus;
  }

  getCities(): string{
    return this.cities;
  }

  getProductList(): string{
    return this.productList;
  }

  getDepartments(): string{
    return this.departments;
  }

  getLogin(): string{
    return this.login;
  }

  getDeleteUser(): string{
    return this.deleteUser;
  }

  getChangePass(): string{
    return this.changePass;
  }

  getDeleteCampus(): string{
    return this.deleteCampus;
  }

  getScheduleCampus(): string{
    return this.scheduleCampus;
  }

  getQuantitySpacesPerCampus(): string{
    return this.quantitySpacesPerCampus;
  }

  getModifyCampus(): string{
    return this.modifyCampus;
  }

  getCreateUser(): string{
    return this.createUser;
  }

  getDeleteUserAdmin(): string{
    return this.deleteUserAdmin;
  }

  getModifyUser(): string{
    return this.modifyUser;
  }

  getSearchUser(): string{
    return this.searchUser;
  }

  getValidUser(): string{
    return this.validUser;
  }

  getSpacesPerCampusList(): string{
    return this.spacesPerCampusList;
  }

  getUserList(): string{
    return this.userList;;
  }

  getCampusList(): string{
    return this.campusList;
  }

  getCreateBooking(): string{
    return this.createBooking;
  }
}
