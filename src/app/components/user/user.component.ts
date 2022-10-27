import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private api: ApiService, private pagination: CustomPaginationService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.count = this.pagination.config
    this.getUserList();
  }
  async getUserList() {
    this.listDetails=[];
    try {
      let data = await this.api.post("auth/admin/users",{
        "limit": 500,
        "offset": 0
    });
    this.listDetails=data.data.rows
    } catch (error) {
      
    }
  }

  pageChange(value: number) {
    this.pagination.config.currentPage = value

  }
  async delete(item:any){
    try {
      let data = await this.api.post('auth/delete',{userId:item});
      if(data.success){
        this.toast.error("User deleted successfully");
        await this.getUserList();
      }
    } catch (error) {
    } 
  }
}
