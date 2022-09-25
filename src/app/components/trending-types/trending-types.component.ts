import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';

@Component({
  selector: 'app-trending-types',
  templateUrl: './trending-types.component.html',
  styleUrls: ['./trending-types.component.scss']
})
export class TrendingTypesComponent implements OnInit {
  listDetails: Array<any>=[];
  count: any;
  addUpdate:String='Add';
  
  @ViewChild('myModal') myModal:any;
  private modalRef:any;
  form!: FormGroup;
  isLoading:boolean=false;
  image:any;
  constructor(private api: ApiService,private toast:ToastrService,
     private pagination: CustomPaginationService,private modalService: ModalManager, public fb: FormBuilder) { }

  async ngOnInit() {
    this.isLoading=true;
    this.count = this.pagination.config;
    this.form = this.fb.group({
      id:[null],
      title:['',Validators.required],
    });
    await this.getTrendingTypes();
  }
  async getTrendingTypes() {
    try {
      let data = await this.api.post("trending-types",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.isLoading=false;
      this.listDetails=data.data.rows;
    }
    } catch (error) {
      this.isLoading=false;
    }
  }

  pageChange(value: number) {
    this.pagination.config.currentPage = value;
  }
 async openModal(item:any){
  this.isLoading=true;
  try {
    if(item.id){
      this.addUpdate='Update';
      this.form.patchValue({
        id:item.id,
        title:item.title,
      })
    }
    else{
      this.addUpdate='Add';
      this.form.patchValue({
        title:'',
      })
    }
    this.modalRef = this.modalService.open(this.myModal, {
        size: "lg",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
    this.isLoading=false;
  } catch (error) {
    this.isLoading=false
  }
  
}
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

async submitTrendingType(){
  this.isLoading=true;
  if(this.form.invalid){
    return
  }
  else{
  if(this.addUpdate=='Add'){
    delete this.form.value.id
  }
  try {
    let data = await this.api.post('trending-types/upsert',this.form.value)
    if(data.success){
      this.toast.success(data.message)
      this.closeModal();
      await this.getTrendingTypes();
      this.isLoading=false;
    } 
  } catch (error) {
    this.isLoading=false;
  }
}
}
async delete(item:any){
  let items:any=item;
  delete items.createdAt
  items.deletedAt=new Date()
  try {
    let data = await this.api.post('trending-types/upsert',items);
    if(data.success){
      await this.getTrendingTypes();
      this.toast.error("trending type deleted successfully");
    }
  } catch (error) {
  } 
}
}
