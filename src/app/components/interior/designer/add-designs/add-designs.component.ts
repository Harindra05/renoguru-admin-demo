import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { UploadS3Service } from 'src/app/services/s3.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-designs',                      
  templateUrl: './add-designs.component.html',
  styleUrls: ['./add-designs.component.scss']
})
export class AddDesignsComponent implements OnInit {
  files: any[] = [];
  inspirationTypes:Array<any>=[];
  newItem:Array<any>=[]
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
  form!: FormGroup;
  isLoading:boolean=false;
  image:Array<any>=[];
  designerId:any;
  trendingData:Array<any>=[];
  propertytypeIDs:Array<any>=[];
  constructor(private api: ApiService,private s3:UploadS3Service,private toast:ToastrService,private modalService: ModalManager, public fb: FormBuilder,private router:ActivatedRoute) { }
  async ngOnInit() {
    this.designerId=this.router.snapshot.params['id']
    this.form = this.fb.group({
      designerId:this.designerId,
      trendingTypes:['', Validators.required],
      title:['', Validators.required],
      propertyTypeId:['', Validators.required],
      packageIncludes:['', Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
    });
    await this.getTrendingTypes()
    await this.getPropertyTypesID();
    await this.getInspirationType();
  }
  async getInspirationType() {
    try {
      let data = await this.api.post("house-types",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.isLoading=false;
      this.inspirationTypes=data.data.rows;
    }
    } catch (error) {
      this.isLoading=false;
    }
  }
  async getPropertyTypesID() {
    try {
      let data = await this.api.post("property-types",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.isLoading=false;
      this.propertytypeIDs=data.data.rows;
    }
    } catch (error) {
      this.isLoading=false;
    }
  }
  async getTrendingTypes(){
    try {
      let data = await this.api.post("trending-types",{
        "limit": 10000,
        "offset": 0
    });
    if(data.success){
      this.isLoading=false;
      this.trendingData=data.data.rows;
    }
    } catch (error) {
      this.isLoading=false;
    }
  }
 
async submitDesigs(){
  this.isLoading=true;
  if(this.form.invalid){
    this.isLoading=false
    return
  }
  else{
  if(this.files.length>0){
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      try {
        let response = await this.s3.uploadFile(file,'designs/'+file?.lastModified+file.name)
          const url = await(response as any).Location;
          this.image.push({imageUrl:url});     
      } catch (error) {
        console.error(error);
      }
    }
  }
  for (let i = 0; i < this.image.length; i++) {
    const element = this.image[i];
    element.imageInspirationType=this.newItem[i].imageInspirationType
    element.areaRange=this.newItem[i].areaRange
  }
  this.form.value.images=this.image;
  this.form.value.trendingTypes=this.form.value.trendingTypes
  let a = this.form.value.packageIncludes.map((e:any)=>{
    return e.value
  })
  this.form.value.packageIncludes=a.toString()
  try {
    let data = await this.api.post('designs/add-design',this.form.value)
    if(data.success){
      this.toast.success(data.message)
      window.location.reload()
      this.isLoading=false;
    } 
  } catch (error) {
    this.isLoading=false;
  }
}
}
onSelect(event:any) {
  this.files.push(...event.addedFiles);
  for (let i = 0; i < event.addedFiles.length; i++) {
    this.newItem.push({imageInspirationType:null,areaRange:null})
  }
}
onRemove(event:any,index:any) {
  this.files.splice(this.files.indexOf(event), 1);
  this.newItem.splice(index,1)
}
}
