import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { BlogsComponent } from 'src/app/components/blogs/blogs.component';
import { DashboardComponent, DashboardDetailsComponent } from 'src/app/components/dashboard/dasboard';
import { UserComponent } from 'src/app/components/user/user';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardModuleComponent } from './dashboard-module.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalModule } from 'ngb-modal';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    DashboardModuleComponent,
    DashboardComponent,
    DashboardDetailsComponent,
    UserComponent,
    BlogsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
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
