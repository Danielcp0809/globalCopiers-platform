import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { machine } from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine/machine.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit, OnDestroy {

  newMachineForm!: FormGroup
  machines: any[] = []
  noDataMessage: string = 'No hay equipos';
  titles = ['marca','modelo','n° serie','departamento','tipo','direccion ip','estado']
  filterMachine = '';
  isEditing: boolean = false;
  suscription!:Subscription
  enterpriseId: string | null = ''

  keys=['brand','model','serial','department','type','ip']

  constructor(
    private formBuilder: FormBuilder,
    private machineService: MachineService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.buildNewMachineForm();
  }

  ngOnInit(): void {
    this.getAllMachines();
  }

  ngOnDestroy(){
    this.suscription.unsubscribe()
  }

  getAllMachines(){
    this.suscription=this.machineService.getMachines(this.enterpriseId || '').subscribe((data)=>{
      this.machines = data.map((machine: any) => {
        return {
          id: machine.payload.doc.id,
          ...machine.payload.doc.data()
        }
      })
      console.log(this.machines)
    })
  }

  editMachine(event: Event){
    if(this.newMachineForm.valid){
      const values = this.newMachineForm.value
      this.machineService.updateMachine(values.id,values).then(()=>{
        this.toastr.success('Equipo actualizado con éxito');
      })
      .catch(()=>{
        this.toastr.error('Error al actualizar el equipo','Error');
      })
    }
  }

  editMachineState(id: string, state: boolean){
    const newState = !state;
    const data = {
      isActive: newState
    }
    this.machineService.updateMachine(id,data)
    .then(()=>{
    // this.toastr.success('Empresa actualizada con éxito', 'Actualizar');
    console.log('Empresa actualizada')
  }).catch((err)=>{
    // this.toastr.error('Error al actualizar la empresa','Error');
    console.error(err)
  })
  }

  openModalEdit(machine: machine){
    this.isEditing = true;
    this.openMyModal('new-machine');
    this.newMachineForm.reset(machine)
  }

  deleteMachine(id: string){
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "Todos los datos del equipo serán eliminados",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4cb79e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.machineService.deleteMachine(id).then(()=>{
          this.toastr.success('Equipo eliminado con éxito');
        }).catch(()=>{
          this.toastr.error('Error al eliminar el equipo','Error');
        })
      }
    })
  }

  addNewMachine(event: Event){
    event.preventDefault()
    if(this.newMachineForm.valid){
      const values = this.newMachineForm.value;
      values.ownerId = this.enterpriseId;
      values.isActive = true;
      this.closeMyModal('new-machine');
      this.machineService.addMachine(values)
        .then(()=>{
          this.toastr.success('Equipo agregado con éxito');
        })
        .catch(()=>{
          this.toastr.error('Error al agregar el equipo','Error');
        })
    }
  }

  buildNewMachineForm(){
    this.enterpriseId = this.route.snapshot.paramMap.get('id')
    this.newMachineForm = this.formBuilder.group({
      brand:['',[Validators.required]],
      model:['',[Validators.required]],
      serial:['',[Validators.required]],
      department:['', [Validators.required]],
      type: ['', [Validators.required]],
      ip: ['', [Validators.required]],
      ownerId: '',
      id:'',
      isActive: true
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
    this.newMachineForm.reset()
    this.isEditing = false;
  }

}
