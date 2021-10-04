import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { enterpriseUser } from '../../models/enterpriseUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  addUser(user: enterpriseUser): Promise<any>{
    return this.firestore.collection('users').add(user);
  }

  getUsers(enterpriseId: string): Observable<any>{
    return this.firestore.collection('users', data => data.where('enterpriseId','==',enterpriseId)).snapshotChanges()
  }

  deleteUser(id: string){
    return this.firestore.collection('users').doc(id).delete()
  }

  updateUser(id: string, data: any){
    return this.firestore.collection('users').doc(id).update(data);
  }

  getUser(id: string){
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }
}
