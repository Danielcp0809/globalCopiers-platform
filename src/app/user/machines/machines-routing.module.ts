import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachinesListComponent } from './components/machines-list/machines-list.component';

const routes: Routes = [
  {
    path:'',
    component: MachinesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MachinesRoutingModule { }
