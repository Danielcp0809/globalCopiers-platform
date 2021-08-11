import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule
  ],
  exports:[
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
