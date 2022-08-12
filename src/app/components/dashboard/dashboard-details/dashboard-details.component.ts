import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomPaginationService } from 'src/app/services/pagination-service';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss']
})
export class DashboardDetailsComponent implements OnInit {

  listDetails: any;
  count: any
  constructor(private http: HttpClient, private pagination: CustomPaginationService) { }

  ngOnInit(): void {
    this.count = this.pagination.config
    this.getDashboardResponse();
  }
  async getDashboardResponse() {
    this.http.get('https://api.covidtracking.com/v2/us/daily.json').subscribe(res => {

      this.listDetails = res
      this.listDetails = this.listDetails.data
      console.log(this.listDetails);
    })

  }

  pageChange(value: number) {
    this.pagination.config.currentPage = value

  }
}
