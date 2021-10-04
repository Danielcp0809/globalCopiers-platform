import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RegisterByAdminComponent } from './components/register-by-admin/register-by-admin.component';


@NgModule({
  declarations: [
    SignInComponent,
    RegisterByAdminComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SignInModule { }
