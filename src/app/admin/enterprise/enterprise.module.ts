import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterprisesListComponent } from './components/enterprises-list/enterprises-list.component';
import { EnterpriseDetailComponent } from './components/enterprise-detail/enterprise-detail.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MachinesListComponent } from './components/machines-list/machines-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    EnterprisesListComponent,
    EnterpriseDetailComponent,
    UsersListComponent,
    MachinesListComponent,
  ],
  imports: [
    CommonModule,
    EnterpriseRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class EnterpriseModule { }
