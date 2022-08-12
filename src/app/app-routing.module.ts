import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginserviceService } from './auth/login.service';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent, canActivate:[LoginserviceService]
  },
  {
    path: 'dashboard',
     canActivate:[AuthGuardService],
    loadChildren: () => import('./layout/full-layout/full-layout.module').then(m => m.FullLayoutModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
