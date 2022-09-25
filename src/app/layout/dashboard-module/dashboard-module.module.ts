import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BlogsComponent } from 'src/app/components/blogs/blogs.component';
import { DashboardComponent } from 'src/app/components/dashboard/dasboard';
import { UserComponent } from 'src/app/components/user/user';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalModule } from 'ngb-modal';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DesignerComponent, DesignsComponent } from 'src/app/components/interior/interior';
import { EnquiryComponent } from 'src/app/components/enquiry/enquiry.component';
import { MasterDataComponent } from 'src/app/components/master-data/master-data.component';
import { AdvertisementComponent as AdvertisementComponent } from 'src/app/components/advertisement/advertisement.component';
import { VideoTabComponent } from 'src/app/components/video-tab/video-tab.component';
import { TrendingComponent } from 'src/app/components/trending/trending.component';
import { InspirationsComponent } from 'src/app/components/inspirations/inspirations.component';
import { DesignerDetailsComponent } from 'src/app/components/interior/designer/designer-details/designer-details.component';
import { PrivacyPolicyComponent } from 'src/app/components/privacy-policy/privacy-policy.component';
import { TermsDocumentComponent } from 'src/app/components/terms-document/terms-document.component';
import { HouseTypesComponent } from 'src/app/components/house-types/house-types.component';
import { AddDesignsComponent } from 'src/app/components/interior/designer/add-designs/add-designs.component';
import { DesginerReviewComponent } from 'src/app/components/interior/designer/desginer-review/desginer-review.component';
import { DesignerDesignsComponent } from 'src/app/components/interior/designer/designer-designs/designer-designs.component';
import { PropertyTypeIdComponent } from 'src/app/components/property-type-id/property-type-id.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { TrendingTypesComponent } from 'src/app/components/trending-types/trending-types.component';

@NgModule({
  declarations: [
    DashboardModuleComponent,
    DashboardComponent,
    UserComponent,
    BlogsComponent,
    DesignerComponent,
    DesignerDetailsComponent,
    DesignsComponent,
    EnquiryComponent,
    MasterDataComponent,
    PrivacyPolicyComponent,
    TermsDocumentComponent,
    AdvertisementComponent,
    VideoTabComponent,
    TrendingComponent,
    InspirationsComponent,
    HouseTypesComponent,
    AddDesignsComponent,
    DesginerReviewComponent,
    DesignerDesignsComponent,
    PropertyTypeIdComponent,
    TrendingTypesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    TagInputModule, 
    FormsModule,
    DashboardModuleRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    AngularEditorModule,
    ModalModule,
    NgxDropzoneModule
  ]
})
export class DashboardModuleModule { }
