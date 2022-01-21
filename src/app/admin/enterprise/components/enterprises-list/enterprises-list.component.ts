import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enterprise } from 'src/app/core/models/enterprise.model';
import { AppService } from 'src/app/core/services/app/app.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EnterpriseService } from 'src/app/core/services/enterprise/enterprise.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-enterprises-list',
  templateUrl: './enterprises-list.component.html',
  styleUrls: ['./enterprises-list.component.scss']
})
export class EnterprisesListComponent implements OnInit, OnDestroy {


  enterprises: any[] = []
  noDataMessage = "No hay empresas"
  titles = ['Nombre', 'Ubicación', 'Estado', 'Equipos']
  keys = ['name','city','sector']
  newEnterpriseForm!: FormGroup;

  isEditing = false;
  filterEnterprise = ''

  subscription!: Subscription

  constructor(
    private authService: AuthService,
    public appService: AppService,
    public formBuilder: FormBuilder,
    private enterpriseService: EnterpriseService,
    private toastr: ToastrService,
    private adminService: AdminService
  ) { 
    console.log(this.authService.userData)
    this.buildNewEnterpriseForm();
    this.appService.routes = [{
      name:'Empresas',
      url:'admin/enterprises'
    }]
  }


  ngOnInit(): void {
    this.getEnterprises();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  openMyModal(event: any) {
    document.querySelector('#' + event)?.classList.add('md-show');
  }

  closeMyModal(event: any) {
    document.querySelector('#' + event)?.classList.remove('md-show');
    this.isEditing = false;
    this.newEnterpriseForm.reset()
  }

  buildNewEnterpriseForm(){
    this.newEnterpriseForm = this.formBuilder.group({
      name:['', [Validators.required]],
      city:['', [Validators.required]],
      sector:['', [Validators.required]],
      id:''
    })
  }

  getEnterprises(){
    this.subscription=this.enterpriseService.getEnterprises().subscribe(data=>{
      this.enterprises = data.map((enterprise: any)=>{
        return {
          id : enterprise.payload.doc.id,
          ...enterprise.payload.doc.data()
        }
      })
      console.log(this.enterprises)
    })
  }

  deleteEnterprise(id: string){

    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "Todos los datos de la empresa serán eliminados",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4cb79e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.enterpriseService.deleteEnterprise(id).then(()=>{
          this.toastr.success('Empresa eliminada con éxito');
          this.adminService.decreaseAdminEnterprises()
        }).catch(()=>{
          this.toastr.error('Error al eliminar la empresa','Error');
        })
      }
    })  

  }

  openModaledit(enterprise: enterprise){
    const editForm = {
      name:enterprise.name,
      city:enterprise.city,
      sector:enterprise.sector,
      id:enterprise.id
    }
    this.isEditing = true;
    this.openMyModal('new-enterprise')
    this.newEnterpriseForm.reset(editForm)
  }

  editEnterprise(event: Event){
    event.preventDefault()
    if(this.newEnterpriseForm.valid){
      const value = this.newEnterpriseForm.value
      this.enterpriseService.updateEnterprise(value.id, value).then(()=>{
        this.toastr.success('Empresa actualizada con éxito');
        this.closeMyModal('new-enterprise')
      }).catch(()=>{
        this.toastr.error('Error al actualizar la empresa','Error');
      })
    }
  }
  
  editEnterpriseState(id: string, isActive: boolean){
    const newState = !isActive;
    const data = {
      isActive: newState
    }
    this.enterpriseService.updateEnterprise(id,data)
      .then(()=>{
      // this.toastr.success('Empresa actualizada con éxito', 'Actualizar');
      console.log('Empresa actualizada')
    }).catch((err)=>{
      // this.toastr.error('Error al actualizar la empresa','Error');
      console.error(err)
    })
  }

  submitForm(event: Event){
    event.preventDefault()
    if(this.newEnterpriseForm.valid){
      const values = this.newEnterpriseForm.value
      const enterprise: enterprise ={
        name : values.name,
        city : values.city,
        sector : values.sector,
        isActive : true,
        machines: 0,
        adminId: this.authService.userData.uid
      }
      this.closeMyModal('new-enterprise')      
      this.enterpriseService.addEnterprise(enterprise)
        .then(() => {
        this.toastr.success('Empresa agregada con éxito');
        this.adminService.increaseAdminEnterprises()
      }).catch(()=>{
        this.toastr.error('Error al agregar la empresa','Error');
      })
    }
  }

  get nameField(){
    return this.newEnterpriseForm.get('name')
  }

  get cityField(){
    return this.newEnterpriseForm.get('city')
  }

  get sectorField(){
    return this.newEnterpriseForm.get('sector')
  }
  

}
