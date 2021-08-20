import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {

  newMachineForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildNewMachineForm();
  }

  ngOnInit(): void {
  }

  buildNewMachineForm(){
    this.newMachineForm = this.formBuilder.group({
      brand:['',[Validators.required]],
      model:['',[Validators.required]],
      serial:['',[Validators.required]],
      department:['', [Validators.required]],
      type: ['', [Validators.required]],
      ip: ['', [Validators.required]],
    })
  }

  get brandField(){
    return this.newMachineForm.get('brand');
  }
  get modelField(){
    return this.newMachineForm.get('model');
  }
  get serialField(){
    return this.newMachineForm.get('serial');
  }
  get departmentField(){
    return this.newMachineForm.get('department');
  }
  get typeField(){
    return this.newMachineForm.get('type');
  }
  get ipField(){
    return this.newMachineForm.get('ip');
  }

  openMyModal(event: any) {
    document.querySelector('#' + event)?.classList.add('md-show');
  }

  closeMyModal(event: any) {
    document.querySelector('#' + event)?.classList.remove('md-show');
  }

}
