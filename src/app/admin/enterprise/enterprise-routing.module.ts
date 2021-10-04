import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseDetailComponent } from './components/enterprise-detail/enterprise-detail.component';
import { EnterprisesListComponent } from './components/enterprises-list/enterprises-list.component';

const routes: Routes = [
  {
    path:'',
    component: EnterprisesListComponent,
  },
  {
    path:':id',
    component: EnterpriseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
