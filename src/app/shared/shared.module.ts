import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayNamePipe } from './pipes/displayName/display-name.pipe';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { PasswordPipe } from './pipes/password/password.pipe';

@NgModule({
  declarations: [
    DisplayNamePipe,
    HeaderComponent,
    TableComponent,
    ModalComponent,
    FilterPipe,
    PasswordPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DisplayNamePipe,
    HeaderComponent,
    TableComponent,
    ModalComponent,
    FilterPipe,
    PasswordPipe
  ]
})
export class SharedModule {}
