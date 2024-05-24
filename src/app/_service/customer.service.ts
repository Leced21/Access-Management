import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { customer } from '../_model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }


  BaseUrl=environment.apiUrl;

  GetAll(){
    return this.http.get<customer[]>(this.BaseUrl + 'Customer/GetAll');
  }

  Getbycode(code:string){
    return this.http.get<customer>(this.BaseUrl + 'Customer/Getbycode?code='+ code);
  }
  Createcustomer(_data:customer){
    return this.http.post(this.BaseUrl + 'Customer/create', _data);
  }

  Updatecustomer(_data:customer){
    return this.http.put(this.BaseUrl + 'Customer/Update?code='+_data.code, _data);
  }

  Deletecustomer(code:string){
    return this.http.delete(this.BaseUrl + 'Customer/Update?code='+ code);
  }
}
