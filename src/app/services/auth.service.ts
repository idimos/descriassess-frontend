import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router} from '@angular/router';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { ApiuserService } from '../services/apiuser.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: User; // Save logged in user data

  constructor(
    private afAuth:AngularFireAuth,
    private router : Router,
    private apisrv: ApiuserService
  ) { 
    this.initialiseUserData();
  }

  public initialiseUserData(){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));

        this.apisrv.apiuser().subscribe(result=>{
          console.log(result);
          localStorage.setItem('apiuserresponse',JSON.stringify(result));
        })
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signIn(email:string,passwd:string){
    this.afAuth.signInWithEmailAndPassword(email, passwd)
      // .then(()=>{
      //   this.apisrv.apiuser().subscribe(result=>{
      //     console.log(result);
      //     localStorage.setItem('apiuserresponse',JSON.stringify(result));
      //   })
      // })
      .catch(error=>{
        window.alert(error.message);
      })
  }

  signUp(email:string,passwd:string){
    return this.afAuth.createUserWithEmailAndPassword(email, passwd)
      .then( result=>{
        this.afAuth.currentUser.then(u=>{
          u.sendEmailVerification({url:'http://localhost:4200/'}).then( ()=>{
            this.router.navigate(['verify-email-address']);
          });
        })    
      }).catch(error=>{
        window.alert(error.message);
      })
  }

  async sendForgotPasswordLink(email:string){
    return await this.afAuth.sendPasswordResetEmail(email,{url:'http://localhost:4200/'})
    .then(()=>{
        window.alert("Request email sent Succesfully!");
        this.router.navigate(['signin']);
    }).catch( error=>{
      window.alert(error.message);
    })
  }

  async updateProfile(displayName:string, photoURL:string){
    return await (await this.afAuth.currentUser).updateProfile({displayName:displayName,photoURL:photoURL})
      .then( ()=>{
        localStorage.removeItem('user');
        this.initialiseUserData();
        window.alert("Update success!");
      }).catch( error=>{
        window.alert(error.message);
      })
  }
  signInWithGoogle(){
    this.afAuth.signInWithRedirect( new auth.GoogleAuthProvider );
  }

  signOut(){
    this.afAuth.signOut()
    .then( ()=>{
      localStorage.clear();// .removeItem('user');
      this.router.navigate(['signin']);
    })
  }

  getLoggedInUser() {
    return this.afAuth.authState;
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  
}
