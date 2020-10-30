import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
// import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  header: any;
  baseUrl: string;
  basePath: string;
  // headers: HttpHeaders;
  products = [];
  constructor(private http: HttpClient)
  {
 //this.basePath = 'https://emmabookstore.herokuapp.com/';
     this.basePath =  'http://localhost:8080/';
     this.baseUrl = this.basePath + 'endpoint/';
     this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }

  // setHeaderWithToken() {
  //   this.headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorisation: `Bearer ${this.utilService.getToken()}`
  //   });
  // }

  findAll(url) {
    return this.http
      .get(`${this.baseUrl}${url}`, { headers: this.header })
      .toPromise();
  }
  findAllExternal(url) {
    return this.http
      .get(`${url}`)
      .toPromise();
  }

  postAll(url, data) {
    return this.http
      .post(`${this.baseUrl}${url}`, data, { headers: this.header })
      .toPromise();
  }
  update(url, data) {
    return this.http
      .put(`${this.baseUrl}${url}`, data, { headers: this.header })
      .toPromise();
  }

  delete(url) {
    return this.http
      .delete(`${this.baseUrl}${url}`,  { headers: this.header })
      .toPromise();
  }

  postUpload(url, data) {
    const head = new HttpHeaders({
      //  'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return this.http
      .post(`${this.baseUrl}${url}`, data, { headers: head })
      .toPromise();
  }

  fetchAllProductFromApi() {
    this.findAll('product/viewallbymerchant').then((e: any) => {
      console.log(e);
      this.products = e;
      this.products.reverse();
      return this.products;
      //  this.utilService.saveAllProducts(this.products);
    });

    return null;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }


}
