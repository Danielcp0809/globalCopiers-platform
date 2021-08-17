import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { titleTable } from 'src/app/core/models/dataTable.model';
import { Route } from 'src/app/core/models/route.model';
import { AppService } from 'src/app/core/services/app/app.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-enterprises-list',
  templateUrl: './enterprises-list.component.html',
  styleUrls: ['./enterprises-list.component.scss']
})
export class EnterprisesListComponent implements OnInit {

  initialData: any[] = [
    {
      'id':'25asdf876121568ads',
      'nombre':'Instituto Nacional de Estadisticas y Censos',
      'estado':'habilitado',
      'cantidad':10
    },
    {
      'id':'26asdf876121568ads',
      'nombre':'Instituto Nacional de Estadisticas y Censos',
      'estado':'habilitado',
      'cantidad':8
    },
    {
      'id':'27asdf876121568ads',
      'nombre':'Instituto Nacional de Estadisticas y Censos',
      'estado':'habilitado',
      'cantidad':9
    },
    {
      'id':'28asdf876121568ads',
      'nombre':'Instituto Nacional de Estadisticas y Censos',
      'estado':'habilitado',
      'cantidad':1
    },
  ]

  titles: titleTable[]= [
    {
      key:'nombre',
      displayName: 'nombre'
    },
    {
      key:'estado',
      displayName: 'estado'
    },
    {
      key:'cantidad',
      displayName: 'cantidad de objetos'
    }
  ]
  actions = {
    enable: true,
    delete: true,
    edit: true,
  }

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
