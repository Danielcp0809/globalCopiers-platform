import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesRoutingModule } from './machines-routing.module';
import { MachinesListComponent } from './components/machines-list/machines-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    MachinesListComponent
  ],
  imports: [
    CommonModule,
    MachinesRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class MachinesModule { }
