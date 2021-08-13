import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData: any
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStorage: AngularFirestore
  ) {
    if(localStorage.getItem('user')){
      this.userData = JSON.parse(localStorage.getItem('user') || '')
    }
  }

  createUser(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
  }

  setUserData(user: User){
    const userRef: AngularFirestoreDocument<any> = this.angularFireStorage.doc(`users/${user.uid}`);
    return userRef.set(user, { merge:true })
  }

  login(email:string, password: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email,password)
  }

  logout(){
    localStorage.removeItem('user');
    return this.angularFireAuth.signOut();
  }

  hasUser(){
    return this.angularFireAuth.authState
  }

  getInfoUser(uid: string | undefined){
    return this.angularFireStorage.collection('users').doc(uid).valueChanges()
  }

}
