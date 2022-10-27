import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';
import { UploadS3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  files: File[] = [];
  listDetails: Array<any>=[];
  count: any;
  htmlContent:any;
  addUpdate:String='Add';
 
  @ViewChild('myModal') myModal:any;
  private modalRef:any;
  form!: FormGroup;
  isLoading:boolean=false;
  image:any;
  constructor(private api: ApiService,private s3:UploadS3Service,private toast:ToastrService,
     private pagination: CustomPaginationService,private modalService: ModalManager, public fb: FormBuilder) { }

  async ngOnInit() {
    this.isLoading=true;
    this.count = this.pagination.config;
    this.form = this.fb.group({
      id:[null],
      title:['',Validators.required],
      link:['',Validators.required],
      section_type:['1',Validators.required],
      common:true
    });
    await this.getAdvertisement();
  }
  async getAdvertisement() {
    this.listDetails=[]
    try {
      let data = await this.api.post("advertisements",{
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
  this.files=[];
  try {
    if(item.id){
      this.addUpdate='Update';
      this.form.patchValue({
        id:item.id,
        link:item.link,
        section_type:1,
        title:item.title,
        common:true
      })
      await this.getBase64FromUrl(item.image).then((result:any)=>{
        let zzz=this;
        this.urltoFile(result, item.image,'image/jpg')
        .then(function(file){ 
          zzz.files.push(file) });
    })
    }
    else{
      this.addUpdate='Add';
      this.form.patchValue({
        title:'',
        link:'',
        section_type:'',
        common:true
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
  urltoFile(url:any, filename:any, mimeType:any){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
  }
  getBase64FromUrl = async (url:any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
    }
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

async submitAdd(){
  this.isLoading=true;
  if(this.form.invalid){
    return
  }
  else{
  if(this.files.length>0){
    this.image  = await this.s3.uploadFile(this?.files[0],'advertisements/'+this.files[0]?.lastModified+this.files[0].name);
    this.image = this.image.Location;
  }
  if(this.addUpdate=='Add'){
    delete this.form.value.id
  }
  this.form.value.image=this.image;
  try {
    let data = await this.api.post('advertisements/upsert',this.form.value)
    if(data.success){
      this.toast.success(data.message)
      this.closeModal();
      await this.getAdvertisement();
      this.isLoading=false;
    } 
  } catch (error) {
    this.isLoading=false;
  }
}
}
onSelect(event:any) {
  this.files.push(...event.addedFiles);
  if(this.files.length>1){
    this.files.splice(0,1);
  }
}
onRemove(event:any) {
  this.files.splice(this.files.indexOf(event), 1);
}
async delete(item:any){
  let items:any=item;
  delete items.createdAt
  delete items.updatedAt
  delete items.track_count
  items.deletedAt=new Date()
  try {
    let data = await this.api.post('advertisements/upsert',items);
    if(data.success){
      this.toast.error("Advertisement deleted successfully");
      await this.getAdvertisement();
    }
  } catch (error) {
  } 
}
//  async uploadImage(a:any){
//   this.image  = await this.s3.uploadFile(a,'blogs/'+a?.lastModified+a.name);
//     this.image = this.image.Location;
// }
}
