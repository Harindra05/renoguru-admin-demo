import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  listDetails: Array<any>=[];
  count: any
  constructor(private api: ApiService, private pagination: CustomPaginationService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.count = this.pagination.config
    this.getEnquiryList();
  }
  async getEnquiryList() {
    this.listDetails=[]
    try {
      let data = await this.api.post("enquiry/list",{
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
        await this.getEnquiryList();
      }
    } catch (error) {
    } 
  }

}
