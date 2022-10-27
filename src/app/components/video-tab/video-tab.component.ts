import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';
import { UploadS3Service } from 'src/app/services/s3.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-tab',
  templateUrl: './video-tab.component.html',
  styleUrls: ['./video-tab.component.scss']
})
export class VideoTabComponent implements OnInit {
  files: File[] = [];
  listDetails: Array<any>=[];
  count: any;
  htmlContent:any;
  addUpdate:String='Add';
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '10rem',
      minHeight: '5rem',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
      ],
      uploadUrl: environment.apiUrl+'s3/upload-image-to-s3',   
  }
  
  @ViewChild('myModal') myModal:any;
  private modalRef:any;
  form!: FormGroup;
  isLoading:boolean=false;
  image:any;
  video:any;
  constructor(private api: ApiService,private s3:UploadS3Service,private toast:ToastrService,
     private pagination: CustomPaginationService,private modalService: ModalManager, public fb: FormBuilder) { }

  async ngOnInit() {
    this.isLoading=true;
    this.count = this.pagination.config;
    this.form = this.fb.group({
      id:[null],
      title:['',Validators.required],
      description:['',Validators.required],
    });
    await this.getVideoList();
  }
  async getVideoList() {
    this.listDetails=[];
    try {
      let data = await this.api.post("videos",{
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
  async submitVideo(){
    this.isLoading=true;
    if(this.form.invalid){
      return
    }
    else{
    if(this.files.length>0){
      this.image  = await this.s3.uploadFile(this?.files[0],'blogs/'+this.files[0]?.lastModified+this.files[0].name);
      this.image = this.image.Location;
    }
    if(this.addUpdate=='Add'){
      delete this.form.value.id
    }
    this.form.value.thumbnail=this.image;
    this.form.value.video_url=this.video;
    console.log(this.form);
    
    try {
      let data = await this.api.post('videos/upsert',this.form.value)
      if(data.success){
        this.toast.success(data.message)
        this.closeModal();
        await this.getVideoList();
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
    items.deletedAt=new Date()
    try {
      let data = await this.api.post('videos/upsert',items);
      if(data.success){
        this.toast.error("video deleted successfully");
        await this.getVideoList();
      }
    } catch (error) {
    } 
  }
  //  async uploadImage(a:any){
  //   this.image  = await this.s3.uploadFile(a,'blogs/'+a?.lastModified+a.name);
  //     this.image = this.image.Location;
  // }
  closeModal(){
    this.modalService.close(this.modalRef);
}
async openModal(item:any){
  this.isLoading=true;
  this.files=[];
  try {
    if(item.id){
      this.addUpdate='Update';
      this.form.patchValue({
        id:item.id,
        title:item.title,
        video_url:item.video_url,
        description:item.description
      })
      this.video=item.video_url
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
        thumbnail:'',
        video_url:'',
        title:'',
        description:''
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
  async onSelectFile(event:any) {
    console.log(event);
    this.isLoading=true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = async (event:any) => { // called once readAsDataURL is completed
        let a:any  = await this.s3.uploadFile(event.target.result,'videos/'+event?.timeStamp+'.mp4');
        // console.log(this.video);
        this.video = a.Location;
        this.isLoading=false
      }
    }
  }
}
