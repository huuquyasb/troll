import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }
  // https://console.firebase.google.com/u/0/project/trollhay-88c51/database/firestore/rules
  // match /databases/{database}/documents {
  //   match /{document=**} {
  //     allow read, write;
  //   }
  // }
  ///// Login/Signup //////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider, 'google');
  }
  twitterLogin() {
    const twitter = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(twitter, 'twitter');
  }
  facebookLogin() {
    const facebook = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(facebook, 'facebook');
  }
  emailLogin(emaill, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(emaill, password);
  }
  // register user email.
  SignInEmailPassword(email, password, displayname) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  updatedProfileDocument(uid, email, displayname) {
    // updated document
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data: User = {
      uid: uid,
      email: email,
      displayName: displayname,
      logintype: 'email',
      roles: {
        subscriber: true
      }
    };
    userRef.set(data, { merge: true });
    // !updated document
    // update profile
    const users = this.afAuth.auth.currentUser;
    users.updateProfile(this.updateProfileUers(displayname)).then(function () {
      return true;
    }).catch(function (error) {
      // An error happened.
      return false;
    });
    // ! updated profile
  }
  private oAuthLogin(provider, type) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user, type);
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('');
  }

  private updateUserData(user, type) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      logintype: type,
      roles: {
        subscriber: true
      }
    };
    userRef.set(data, { merge: true });
    this.router.navigateByUrl('');
  }


  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }
  checkLogged() {
    return this.afAuth.auth.currentUser;
  }

  private updateProfileUers(displayname: any): { displayName: string; photoURL: string; } {
    return {
      displayName: displayname,
      photoURL: ''
    };
  }
  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    // tslint:disable-next-line:curly
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }


}
