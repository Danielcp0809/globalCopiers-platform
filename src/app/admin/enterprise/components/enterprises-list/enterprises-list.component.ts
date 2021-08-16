import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/core/models/route.model';
import { AppService } from 'src/app/core/services/app/app.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-enterprises-list',
  templateUrl: './enterprises-list.component.html',
  styleUrls: ['./enterprises-list.component.scss']
})
export class EnterprisesListComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public appService: AppService
  ) { 
    this.appService.routes = [{
      name:'Empresas',
      url:'/enterprice'
    }]
  }


  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout()
    this.router.navigate(['sign-in'])
  }

}
