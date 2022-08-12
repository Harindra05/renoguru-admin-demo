import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FullLayoutRoutingModule } from './full-layout-routing.module';
import { FullLayoutComponent } from './full-layout.component';


@NgModule({
  declarations: [
    FullLayoutComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FullLayoutRoutingModule,
    SharedModule,
  ]
})
export class FullLayoutModule { }
