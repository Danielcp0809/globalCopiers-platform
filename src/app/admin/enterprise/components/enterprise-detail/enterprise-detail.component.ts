import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { enterprise } from 'src/app/core/models/enterprise.model';
import { AppService } from 'src/app/core/services/app/app.service';
import { EnterpriseService } from 'src/app/core/services/enterprise/enterprise.service';

@Component({
  selector: 'app-enterprise-detail',
  templateUrl: './enterprise-detail.component.html',
  styleUrls: ['./enterprise-detail.component.scss']
})
export class EnterpriseDetailComponent implements OnInit, OnDestroy {

  enterprise : enterprise = {
    id:'',
    name : '',
    city : '',
    sector : '',
    isActive : false,
    machines: 0,
  }
  id: string | null
  sub: Subscription
  constructor(
    public appService: AppService,
    private route: ActivatedRoute,
    private enterpriseService: EnterpriseService) { 

    this.id = this.route.snapshot.paramMap.get('id')
    this.sub = this.enterpriseService.getEnterprise(this.id || '').subscribe((data)=>{
      this.enterprise = {
        id:data.payload.id,
        name : data.payload.data()['name'],
        city : data.payload.data()['city'],
        sector : data.payload.data()['sector'],
        isActive : data.payload.data()['isActive'],
        machines: data.payload.data()['machines'],
      }
      console.log(this.enterprise)
      this.appService.routes = [
        {
          name:'Empresas',
          url:'/enterprices'
        },
        {
          name:this.enterprise.name,
          url:`/${this.enterprise.id}`
        }
      ]
    }) 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
