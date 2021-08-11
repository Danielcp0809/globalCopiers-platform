import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyValidators } from 'src/app/utils/validators/validators';


@Component({
  selector: 'app-register-by-admin',
  templateUrl: './register-by-admin.component.html',
  styleUrls: ['./register-by-admin.component.scss']
})
export class RegisterByAdminComponent implements OnInit {
  hide: Boolean = true;
  isLoading: Boolean = false;
  registerForm!:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.buildForm()
  }

  ngOnInit(): void {
  }

  private buildForm(){
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, MyValidators.validPassword]],
      confirmPassword:['',Validators.required]
    },{
      validators: MyValidators.matchPassword
    })
  }

  submitRegisterForm(event: Event){
    event.preventDefault;
    if(this.registerForm.valid){
      this.isLoading=true;
      const values = this.registerForm.value
      console.log(values)
      this.authService.createUser(values.email, values.password)
        .then((result)=>{
          this.isLoading=false;
          const user = result.user
          const newUser: User = {
            uid: user?.uid,
            email: user?.email,
            displayName: this.registerForm.value.name,
            userType: 'admin'
          }
          console.log(newUser)
          this.authService.setUserData(newUser)
            .then(()=>{
              console.log('done')
              this.authService.logout()
              this.router.navigate(['/sign-in'])
            })
            .catch((error)=>{
              this.isLoading=false;
              window.alert(error)
            })
        }).catch((error)=>{
          this.isLoading=false;
          window.alert(error)
        })
    }
  }

  get nameField(){
    return this.registerForm.get('name')
  }

  get emailField(){
    return this.registerForm.get('email')
  }

  get passwordField(){
    return this.registerForm.get('password')
  }

  get confirmPassField(){
    return this.registerForm.get('confirmPassword')
  }


}
