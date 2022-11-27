import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { enterprise } from 'src/app/core/models/enterprise.model';
import { enterpriseUser } from 'src/app/core/models/enterpriseUser.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  @Input() onwerInformation!:enterprise
  @Input() departmentOptions: string[] = []

  isEditing: boolean = false;
  titles = ['nombre','usuario','contraseña','departamento','estado']
  newUserForm!: FormGroup;
  users: any[] = [];
  noDataMessage: string = 'No hay usuarios';
  filterUser = '';
  suscription!: Subscription
  enterpriseId: string | null = '';

  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private authServices: AuthService,
    private toastr: ToastrService,
  ) { 
    this.enterpriseId = this.route.snapshot.paramMap.get('id');
    this.buildForm()
    
  }
  
  ngOnInit(): void {
    this.getAllUsers()
  }
  
  ngOnDestroy(){
    this.suscription.unsubscribe()
  }
  
  getAllUsers(){
    this.suscription = this.userService.getUsers(this.enterpriseId || '').subscribe((data)=>{
      this.users = data.map((user: any) => {
        return{
          id: user.payload.doc.id,
          ...user.payload.doc.data(),
          hidePass:true
        }
      })
       
    })
  }

  editUserState(id: string, isActive: boolean){
    const newState = !isActive;
    const data = {
      isActive: newState
    }
    this.userService.updateUser(id,data)
      .then(()=>{
         
      })
      .catch((err)=>{
        console.error(err)
      })
  }

  deleteUser(id: string){
    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: "Todos los datos de la usuario serán eliminados",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#4cb79e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).then(()=>{
          this.toastr.success('Usuario eliminado con éxito');
        }).catch(()=>{
          this.toastr.error('Error al eliminar al usuario','Error');
        })
      }
    }) 
  }

  editUser(event: Event){
    event.preventDefault()
    if(this.newUserForm.valid){
      const values = this.newUserForm.value
      const actualUser = {
        userName: values.userName,
        displayName: values.name,
        userType: 'user',
        pass:btoa(values.password),
        isActive: true,
        enterpriseId: this.enterpriseId,
        department: values.department,
      }
      this.userService.updateUser(values.id, actualUser).then(()=>{
        this.toastr.success('Usuario actualizado con éxito');
        this.closeMyModal('new-user');
      }).catch(()=>{
        this.toastr.error('Error al actualizar el usuario','Error');
      })
    }
  }

  openModalEdit(user: enterpriseUser){
    const editForm = {
      name: user.displayName,
      userName: user.userName,
      password: atob(user.pass),
      id: user.id,
      department: user.department
    }
    this.isEditing = true;
    this.openMyModal('new-user');
    this.newUserForm.reset(editForm)
  }


  addNewUser(event: Event){
    event.preventDefault()
    if(this.newUserForm.valid){
      const values = this.newUserForm.value
      const newUser = {
        userName: values.userName,
        displayName: values.name,
        userType: 'user',
        pass:btoa(values.password),
        isActive: true,
        enterpriseId: this.enterpriseId,
        department: values.department,
      }
       
      this.userService.addUser(newUser).then(()=>{
        this.toastr.success('Usuario creado con éxito');
        this.closeMyModal('new-user');
      }).catch(()=>{
        this.toastr.error('Error al crear el usuario','Error');
      })
    }
  }

  buildForm(){
    this.newUserForm = this.formBuilder.group({
      name:['',[Validators.required]],
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]],
      department: ['',[Validators.required]],
      id:'',
    })
  }

  toggleHidePass(index: number){
    this.users[index].hidePass = !this.users[index].hidePass   
  }

  openMyModal(event: any) {
    document.querySelector('#' + event)?.classList.add('md-show');
  }

  closeMyModal(event: any) {
    document.querySelector('#' + event)?.classList.remove('md-show');
    this.newUserForm.reset()
    // this.isEditing = false;
  }

  get nameField(){
    return this.newUserForm.get('name');
  }
  get userNameField(){
    return this.newUserForm.get('userName');
  }
  get passwordField(){
    return this.newUserForm.get('password');
  }
  get departmentField(){
    return this.newUserForm.get('department');
  }

}
