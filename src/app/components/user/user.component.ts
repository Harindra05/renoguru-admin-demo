import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  listDetails: Array<any>=[];
  count: any
  constructor(private api: ApiService, private pagination: CustomPaginationService) { }

  ngOnInit(): void {
    this.count = this.pagination.config
    this.getUserList();
  }
  async getUserList() {
    try {
      let data = await this.api.post("auth/admin/users",{
        "limit": 50,
        "offset": 0
    });
    this.listDetails=data.data.rows
    // this.listDetails.push({fullName:'test'})
      console.log(this.listDetails);
    } catch (error) {
      
    }
  }

  pageChange(value: number) {
    this.pagination.config.currentPage = value

  }
}
