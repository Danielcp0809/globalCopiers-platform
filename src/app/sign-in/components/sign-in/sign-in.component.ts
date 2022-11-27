import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup
  type: string = ''

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private activedRoute: ActivatedRoute
  ) {
    this.buildForm()
   }

  ngOnInit(): void {
    this.activedRoute.data.subscribe(data => {
      this.type = data.type
    })
  }

  signIn(event: Event){
    event.preventDefault()
    if(this.signInForm.valid){
      const values = this.signInForm.value
      if(this.type === 'admin'){
        this.adminSignIn(values)
      }else if(this.type === 'user'){
         
        this.userSignIn(values)
      }
    }
  }

  adminSignIn(values: any){
    this.authService.login(values.email, values.password).then(
      result=>{
         
        const userData = this.authService.getInfoUser(result.user?.uid).subscribe(
          (res: any)=>{
            if(res){
              localStorage.setItem('user',JSON.stringify(res));
              this.authService.userData = res;
              this.router.navigate([`${res.userType}`])
            }
          })
      }
    ).catch(() => {
      this.toastr.error('Verifica tus credenciales e intentalo de nuevo','Usuario no encontrado',
      {
        timeOut:10000,
      });
    })
  }

  userSignIn(values: any){
     
    this.authService.getInfoUserByEmail(values.email, values.password).subscribe(
      (res: any) => {
        if(res.length !== 0){
           
          localStorage.setItem('user',JSON.stringify(res[0]));
          this.authService.userData = res[0];
           
          this.router.navigate(['user'])
        }else{
          this.toastr.error('Verifica tus credenciales e intentalo de nuevo','Usuario no encontrado',
          {
            timeOut:10000,
          });
        }
      },
    )
  }

  buildForm(){
    this.signInForm = this.fromBuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

}
