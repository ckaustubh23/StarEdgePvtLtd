import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalDataService } from './global-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private globalData: GlobalDataService) { }

  login(credentials: {mobileNo: string; mPin: string}): Observable<any> {
    const url = `${this.globalData.getBaseUrl()}/api/Auth/LoginbyMPIN`;
    return this.http.post(url, credentials)
  }
}
