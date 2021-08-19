import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { enterprise } from '../../models/enterprise.model'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
    ){}

  addEnterprise(enterprise: enterprise): Promise<any>{
    return this.firestore.collection('enterprises').add(enterprise);
  }

  getEnterprises(): Observable<any>{
    return this.firestore.collection('enterprises', data => data.where('adminId','==',this.authService.userData.uid)).snapshotChanges()
  }

  deleteEnterprise(id: string){
    return this.firestore.collection('enterprises').doc(id).delete()
  }

  updateEnterprise(id: string, data: any){
    return this.firestore.collection('enterprises').doc(id).update(data);
  }
}
