import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterByAdminComponent } from './components/register-by-admin/register-by-admin.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'user',
    pathMatch: 'full'
  },
  {
    path:'user',
    component: SignInComponent,
    data:{
      type:'user'
    }
  },
  {
    path:'admin',
    component: SignInComponent,
    data:{
      type:'admin'
    }
  },
  {
    path:'registerbyadmin',
    component: RegisterByAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
