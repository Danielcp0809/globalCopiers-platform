import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { enterprise } from '../../models/enterprise.model'
import { AuthService } from '../auth/auth.service';
import { MachineService } from '../machine/machine.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private machineService: MachineService
    ){}

  addEnterprise(enterprise: enterprise): Promise<any>{
    return this.firestore.collection('enterprises').add(enterprise);
  }

  getEnterprises(): Observable<any>{
    return this.firestore.collection('enterprises', data => data.where('adminId','==',this.authService.userData.uid)).snapshotChanges()
  }

  deleteEnterprise(id: string){
    this.firestore.collection('machines').ref.where('ownerId','==',id).get().then((machines)=>{
        machines.docs.forEach(machine => {
        this.machineService.deleteMachine(machine.id)
      });
    })
    return this.firestore.collection('enterprises').doc(id).delete()
  }

  updateEnterprise(id: string, data: any){
    return this.firestore.collection('enterprises').doc(id).update(data);
  }

  getEnterprise(id: string):Observable<any>{
    return this.firestore.collection('enterprises').doc(id).snapshotChanges()
  }

  increaseMachines(id: string, previousValue: number){
    const data = {
      machines : previousValue + 1 
    }
    return this.updateEnterprise(id,data)
  }

  decreaseMachines(id: string, previousValue: number){
    if(previousValue>=0){
      const data = {
        machines : previousValue - 1 
      }
      return this.updateEnterprise(id,data)
    }
    return null
  }
}
