import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login/user',
    pathMatch: 'full'
  },
  {
    path:'login',
    loadChildren: ()=>import('./sign-in/sign-in.module').then(m=>m.SignInModule)
  },
  {
    path:'admin',
    canActivate: [AdminGuard],
    loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'user',
    canActivate: [UserGuard],
    loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
