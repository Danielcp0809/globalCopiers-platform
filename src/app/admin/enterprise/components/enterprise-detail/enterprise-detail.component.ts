import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/core/models/route.model';
import { AppService } from 'src/app/core/services/app/app.service';

@Component({
  selector: 'app-enterprise-detail',
  templateUrl: './enterprise-detail.component.html',
  styleUrls: ['./enterprise-detail.component.scss']
})
export class EnterpriseDetailComponent implements OnInit {


  constructor(public appService: AppService) { 
    this.appService.routes = [
      {
        name:'Empresas',
        url:'/enterprices'
      },
      {
        name:'Policia Nacional',
        url:'/a12e4rga98sdf6545h7jy'
      }
    ]
  }

  ngOnInit(): void {
  }

}
