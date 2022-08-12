import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from 'src/app/components/blogs/blogs.component';
import { DashboardComponent, DashboardDetailsComponent } from 'src/app/components/dashboard/dasboard';
import { UserComponent } from 'src/app/components/user/user';
import { DashboardModuleComponent } from './dashboard-module.component';

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
        path: 'dashbord-details',
        component: DashboardDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
