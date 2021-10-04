import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { machine } from '../../models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private firestore: AngularFirestore,
  ) { }


  addMachine(machine: machine): Promise<any>{
    return this.firestore.collection('machines').add(machine);
  }

  getMachines(enterpriseId: string): Observable<any>{
    return this.firestore.collection('machines', data => data.where('enterpriseId','==',enterpriseId)).snapshotChanges()
  }

  deleteMachine(id: string){
    return this.firestore.collection('machines').doc(id).delete()
  }

  updateMachine(id: string, data: any){
    return this.firestore.collection('machines').doc(id).update(data);
  }

  getMachine(id: string){
    return this.firestore.collection('machines').doc(id).snapshotChanges()
  }
}
