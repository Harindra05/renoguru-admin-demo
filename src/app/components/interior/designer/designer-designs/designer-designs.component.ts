import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';

@Component({
  selector: 'app-designer-designs',
  templateUrl: './designer-designs.component.html',
  styleUrls: ['./designer-designs.component.scss']
})
export class DesignerDesignsComponent implements OnInit {
  listDetails: Array<any>=[];
  count: any;
  isLoading:boolean=false;
  designerId:any;
  constructor(private api: ApiService,private toast:ToastrService,private router:ActivatedRoute,
     private pagination: CustomPaginationService) { }

  async ngOnInit() {
    this.isLoading=true;
    this.designerId=this.router.snapshot.params['id']
    this.count = this.pagination.config;
    await this.getDesignList();
  }
  async getDesignList() {
    try {
      let data = await this.api.post("designs/get-designs",{
        "limit": 10000,
        "offset": 0,
        "designerId":this.designerId
    });
    if(data.success){
      this.isLoading=false;
      this.listDetails=data.data.rows;
      console.log(this.listDetails);
      
    }
    } catch (error) {
      this.isLoading=false;
    }
  }

  pageChange(value: number) {
    this.pagination.config.currentPage = value;
  }
async delete(item:any){
  let items:any=item;
  delete items.createdAt
  items.deletedAt=new Date()
  try {
    let data = await this.api.post('designs/create-designer',items);
    if(data.success){
      this.toast.warning("Designs deleted");
      await this.getDesignList();
    }
  } catch (error) {
  } 
}

}
