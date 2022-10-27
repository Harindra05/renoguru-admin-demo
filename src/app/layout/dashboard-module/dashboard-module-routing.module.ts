import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementComponent } from 'src/app/components/advertisement/advertisement.component';
import { BlogsComponent } from 'src/app/components/blogs/blogs.component';
import { DashboardComponent } from 'src/app/components/dashboard/dasboard';
import { EnquiryComponent } from 'src/app/components/enquiry/enquiry.component';
import { DesignerComponent, DesignsComponent } from 'src/app/components/interior/interior';
import { PrivacyPolicyComponent } from 'src/app/components/privacy-policy/privacy-policy.component';
import { UserComponent } from 'src/app/components/user/user';
import { VideoTabComponent } from 'src/app/components/video-tab/video-tab.component';
import { InspirationsComponent } from 'src/app/components/inspirations/inspirations.component';
import { TrendingComponent } from 'src/app/components/trending/trending.component';
import { DashboardModuleComponent } from './dashboard-module.component';
import { DesignerDetailsComponent } from 'src/app/components/interior/designer/designer-details/designer-details.component';
import { HouseTypesComponent } from 'src/app/components/master-data/house-types/house-types.component';
import { PropertyTypeIdComponent } from 'src/app/components/master-data/property-type-id/property-type-id.component';
import { TrendingTypesComponent } from 'src/app/components/master-data/trending-types/trending-types.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardModuleComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'blogs',
        component: BlogsComponent
      },
      {
        path: 'interior-designer',
        component: DesignerComponent
      },
      {
        path: 'interior-designer/details/:id',
        component: DesignerDetailsComponent
      },
      {
        path: 'interior-designs',
        component: DesignsComponent
      },
      {
        path: 'enquiry',
        component: EnquiryComponent
      },
      {
        path: 'house-types',
        component: HouseTypesComponent
      },
      {
        path: 'property-types',
        component: PropertyTypeIdComponent
      },
      {
        path: 'trending-types',
        component: TrendingTypesComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'inspirations',
        component: InspirationsComponent
      },
      {
        path: 'trending',
        component: TrendingComponent
      },
        {
        path: 'advertisement',
        component: AdvertisementComponent
      },
        {
        path: 'videos',
        component: VideoTabComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
