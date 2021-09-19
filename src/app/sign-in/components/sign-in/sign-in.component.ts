import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup

  constructor(
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm()
   }

  ngOnInit(): void {
  }

  signIn(event: Event){
    event.preventDefault()
    if(this.signInForm.valid){
      const values = this.signInForm.value
      this.authService.login(values.email, values.password).then(
        result=>{
          console.log(result)
          const userData = this.authService.getInfoUser(result.user?.uid).subscribe(
            (res: any)=>{
              if(res){
                localStorage.setItem('user',JSON.stringify(res));
                this.authService.userData = res;
                this.router.navigate([`${res.userType}`])
              }
            })
        }
      )
    }
  }

  buildForm(){
    this.signInForm = this.fromBuilder.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

}
