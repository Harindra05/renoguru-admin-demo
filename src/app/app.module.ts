import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModuleModule } from 'src/app/layout/dashboard-module/dashboard-module.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLayoutModule } from './layout/full-layout/full-layout.module';
import { LoginComponent } from './pages/login/login.component';
import { ApiService } from './services/api.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginserviceService } from './auth/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    FullLayoutModule,
    DashboardModuleModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService,AuthGuardService,LoginserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
