import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { enterprise } from 'src/app/core/models/enterprise.model';
import { machine } from 'src/app/core/models/machine.model';
import { AppService } from 'src/app/core/services/app/app.service';
import { EnterpriseService } from 'src/app/core/services/enterprise/enterprise.service';
import { MachineService } from 'src/app/core/services/machine/machine.service';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.scss']
})
export class MachinesListComponent implements OnInit {

  subscription!: Subscription
  userMachines!: machine[]
  enterpriseData!: enterprise
  userDepartment: string = ''

  constructor(
    public appService: AppService,
    private machineService: MachineService,
    private enterpriseService: EnterpriseService,
  ) {
    this.appService.routes = [
      {
        name:'Equipos',
        url:'user/machines'
      },
    ]
    this.userDepartment = JSON.parse(localStorage.getItem('user')|| '').department
  }
         
  ngOnInit(): void {
    this.getUserMachines()
    this.getEnterpriseData()
  }

  getUserMachines(){
    const user = JSON.parse(localStorage.getItem('user') || '')
    this.subscription = this.machineService.getUserMachines(user.enterpriseId, user.department)
      .subscribe(data => {
        this.userMachines = data.map((machine: any) => {
          const machineData = machine.payload.doc
          return{
            id: machineData.id,
            ...machineData.data()
          }
        })
         
    })
  }

  getEnterpriseData(){
    const user = JSON.parse(localStorage.getItem('user') || '')
    this.enterpriseService.getEnterprise(user.enterpriseId).subscribe(
      (res: any)=>{
        this.enterpriseData = {
          id: res.payload.id,
          ...res.payload.data()
        }
      }
    )
  }

  openMachine(ip: string){
    window.open(`http://${ip}`,'', '_blank');
  }
}
