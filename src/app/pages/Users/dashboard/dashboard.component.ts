import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  brokers: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private dashboardServices : DashboardService){

  }

  ngOnInit(): void {
    this.loadBrokers();
  }

  loadBrokers(){
    this.loading = true;

    forkJoin({
      brokerInfo: this.dashboardServices.globalDashboardData(),
      userBrokers: this.dashboardServices.userBrokerData()
    }).subscribe({
      next: (res) => {
        const brokerInfoData =  res.brokerInfo?.data || [];
        const userBrokerData = res.userBrokers?.data || [];

        this.brokers = brokerInfoData.map((broker: any) => {
        const userBroker = userBrokerData.find(
          (u: any) => +u.brokerID === +broker.brokerID
        );
        return {
          ...broker,
          acc_session: userBroker?.acc_session || false,
          default_broker: userBroker?.default_broker || false,
          loginID: userBroker?.loginID || null
        };
      });

      this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load broker data';
        this.loading = false;
      }
    })
  }
}
