import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  route = 'Empresas / Angular form'

  constructor(
    public authService: AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  toogleNavMenu(){
    document.querySelector('#menu')?.classList.toggle('nav-show');
  }

  openNavMenu(){
    document.querySelector('#menu')?.classList.add('nav-show');
  }

  closeNavMenu(){
    document.querySelector('#menu')?.classList.remove('nav-show');
  }

  logOut(){
    this.authService.logout()
    this.router.navigate(['sign-in'])
  }

}
