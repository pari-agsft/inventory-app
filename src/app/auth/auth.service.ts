import { Router } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

constructor(private router: Router, private af: AngularFireAuth) {}

 signupUser(email: string, password: string) {
    this.af.auth.createUserWithEmailAndPassword(email, password)
    .then(
        (success) => {
           let user:any = this.af.auth.currentUser;
           user.sendEmailVerification().then(
             (success) => {
              console.log("please verify your email");
              alert("please verify your email");
            } 
           ).catch(
             (err) => {
               console.log("Error:" + err);
               alert("Error:" + err);
             }
           )

        })
      .catch(
        error => alert(error.message)
      );
    
  }

  signinUser(email: string, password: string) {
    this.af.auth.signInWithEmailAndPassword(email,password)
      .then(
        response => {
          this.router.navigate(['/']);
          this.af.auth.currentUser.getToken()
            .then(
              (token: string) =>  {
                localStorage.setItem('token',token);
                localStorage.setItem('uid',this.af.auth.currentUser.uid);
                localStorage.setItem('email',this.af.auth.currentUser.email);
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinGmail() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        response => {
          this.router.navigate(['/']);
          this.af.auth.currentUser.getToken()
            .then(
              (token: string) => {
                localStorage.setItem('token',token)
                localStorage.setItem('uid',this.af.auth.currentUser.uid);
                localStorage.setItem('email',this.af.auth.currentUser.email);
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    this.af.auth.signOut();
    localStorage.clear();
  }

  getEmail(){
    return localStorage.getItem('email');
  }

  getUID(){
    return localStorage.getItem('uid');
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isAuthenticated() {
    return localStorage.getItem('token') != null;
  }
}
