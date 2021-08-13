import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayNamePipe } from './pipes/displayName/display-name.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    DisplayNamePipe,
    HeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DisplayNamePipe,
    HeaderComponent
  ]
})
export class SharedModule { }
