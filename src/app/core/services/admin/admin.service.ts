import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppService } from '../app/app.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}


  getAdminInfo(){
    const userData = this.authService.userData
    return this.firestore.collection('users').doc(userData.uid).ref.get()
  }

  increaseAdminMachines(){
    const userData = this.authService.userData
    const data = {
      machinesCount: userData.machinesCount + 1
    }
    this.firestore.collection('users').doc(userData.uid).update(data).then(()=>{
      this.authService.userData.machinesCount++;
      localStorage.setItem('user',JSON.stringify(this.authService.userData));
    });
  }

  increaseAdminUsers(){
    const userData = this.authService.userData
    const data = {
      usersCount: userData.usersCount + 1
    }
    this.firestore.collection('users').doc(userData.uid).update(data).then(()=>{
      this.authService.userData.usersCount++;
      localStorage.setItem('user',JSON.stringify(this.authService.userData));
    });;
  }

  increaseAdminEnterprises(){
    const userData = this.authService.userData
    const data = {
      enterprisesCount: userData.enterprisesCount + 1
    }
     
    this.firestore.collection('users').doc(userData.uid).update(data).then(()=>{
      this.authService.userData.enterprisesCount++;
      localStorage.setItem('user',JSON.stringify(this.authService.userData));
    });
  }

  decreaseAdminMachines(){
    const userData = this.authService.userData
    const data = {
      machinesCount: userData.machinesCount<=0 ? userData.machinesCount : userData.machinesCount - 1
    }
    this.firestore.collection('users').doc(userData.uid).update(data).then(()=>{
      this.authService.userData.machinesCount<=0?  this.authService.userData.machinesCount: this.authService.userData.machinesCount--;
      localStorage.setItem('user',JSON.stringify(this.authService.userData));
    });
  }

  decreaseAdminUsers(){
    const userData = this.authService.userData
    const data = {
      usersCount: userData.usersCount<=0 ? userData.usersCount : userData.usersCount - 1
    }
    this.firestore.collection('users').doc(userData.uid).update(data).then(()=>{
      this.authService.userData.usersCount<=0?  this.authService.userData.usersCount: this.authService.userData.usersCount--;
      localStorage.setItem('user',JSON.stringify(this.authService.userData));
    });
  }

  decreaseAdminEnterprises(){
    const userData = this.authService.userData
    const data = {
      enterprisesCount: userData.enterprisesCount<= 0 ? userData.enterprisesCount : userData.enterprisesCount - 1
    }
    this.firestore.collection('users').doc(userData.uid).update(data).then(()=>{
      this.authService.userData.enterprisesCount<=0?  this.authService.userData.enterprisesCount: this.authService.userData.enterprisesCount--;
      localStorage.setItem('user',JSON.stringify(this.authService.userData));
    });
  }


  
  
}
