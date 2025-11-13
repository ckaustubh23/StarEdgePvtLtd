import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalDataService } from './global-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private globalData: GlobalDataService) { }


  globalDashboardData(): Observable<any> {
    const url = `${this.globalData.getBaseUrl()}/api/Bridge/GetBrokerInfo`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.globalData.getToken()}`,
      'Content-Type': 'application/json'
    }); 

    return this.http.get(url, {headers})
  }

  userBrokerData(): Observable<any> {
    const url = `${this.globalData.getBaseUrl()}/api/Bridge/GetUserBrokerList`;

    const data = {
      mobileNo: this.globalData.getMobileNo()
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.globalData.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(url, data, {headers})
  }
  
}
