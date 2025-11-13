import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private baseUrl: string = 'https://localhost:7127';
  private ucc: string = '';
  private authToken: string | null = null;
  private mobileNo: string = '';

  constructor() {}

  getBaseUrl(){
    return this.baseUrl;
  }

  //UCC
  setUcc(data: string) {
    this.ucc = data;
  }

  getUserData() {
    return this.ucc;
  }

  //Token
  setAuthToken(token: string) {
    this.authToken = token;
  }

  getToken() {
    return this.authToken;
  }

  //Mobile No
  setMobileNo(data: string){
    this.mobileNo = data;
  }

  getMobileNo(){
    return this.mobileNo;
  }
}
