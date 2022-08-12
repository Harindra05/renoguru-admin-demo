import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CustomPaginationService } from 'src/app/services/pagination-service';
import { UploadS3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  files: File[] = [];
  listDetails: Array<any>=[];
  count: any;
  htmlContent:any;
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
  }
  @ViewChild('myModal') myModal:any;
  private modalRef:any;
  form!: FormGroup;
  constructor(private api: ApiService,private s3:UploadS3Service,private toast:ToastrService,
     private pagination: CustomPaginationService,private modalService: ModalManager, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.count = this.pagination.config;
    this.form = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });
    this.getBlogList();
  }
  async getBlogList() {
    try {
      let data = await this.api.post("blogs",{
        "limit": 10,
        "offset": 0
    });
    this.listDetails=data.data.rows
      console.log(this.listDetails);
    } catch (error) {
      
    }
  }

  pageChange(value: number) {
    this.pagination.config.currentPage = value
  }
  openModal(){
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
}
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}
image:any;
async submitBlog(){
  if(this.form.invalid){
    return
  }
  else{
  if(this.files.length>0){
    this.image  = await this.s3.uploadFile(this?.files[0],'blogs/'+Math.random() * 100000 +this.files[0]?.lastModified+this.files[0].name);
    this.image = this.image.Location;
  }
  this.form.value.image=this.image
  let data = await this.api.post('blogs/upsert',this.form.value)
  if(data.success){
    this.toast.success(data.message)
    this.closeModal();
    this.getBlogList();
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
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}
}
