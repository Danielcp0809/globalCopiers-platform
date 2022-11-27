import { Component, OnDestroy, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { enterprise } from 'src/app/core/models/enterprise.model';
import { machine } from 'src/app/core/models/machine.model';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { EnterpriseService } from 'src/app/core/services/enterprise/enterprise.service';
import { MachineService } from 'src/app/core/services/machine/machine.service';
import { MyValidators } from 'src/app/utils/validators/validators';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit, OnDestroy {

  @Input() onwerInformation!:enterprise
  @Output() departmentOptions = new EventEmitter<string[]>();


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
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private adminService: AdminService
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
      const depOptions = this.machines.map( machine => machine.department)
      this.departmentOptions.emit(depOptions.filter((opt, index, array) => array.indexOf(opt) == index))
    })
  }

  editMachine(event: Event){
    if(this.newMachineForm.valid){
      const values = this.newMachineForm.value
      this.machineService.updateMachine(values.id,values).then(()=>{
        this.toastr.success('Equipo actualizado con éxito');
        this.closeMyModal('new-machine');
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
          this.enterpriseService.decreaseMachines(this.enterpriseId || '', this.onwerInformation.machines)
          this.adminService.decreaseAdminMachines()
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
      delete values['id']
      values.enterpriseId = this.enterpriseId;
      values.isActive = true;
      this.closeMyModal('new-machine');
      this.machineService.addMachine(values)
        .then(()=>{
          this.toastr.success('Equipo agregado con éxito');
          this.enterpriseService.increaseMachines(this.enterpriseId || '', this.onwerInformation.machines)
          this.adminService.increaseAdminMachines()
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
      type: ['B/N', [Validators.required]],
      ip: ['', [Validators.required, MyValidators.ipAddress]],
      enterpriseId: '',
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
