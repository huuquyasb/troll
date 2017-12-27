import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../login/login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.auth.onAuthStateChanged(function (user) {
      if (user) {
         router.navigateByUrl('');
      }
    });
   }
   msg: any;
  //  If a Trollhay account exists for huuquy.ctltqb@gmail.com, an e-mail will be sent with further instructions.!
   error: any;
   resetPassword(formData3) {
    if (formData3.valid) {
      return this.afAuth.auth.sendPasswordResetEmail(formData3.value.username)
        .then(function () {
         // tslint:disable-next-line:max-line-length
         this.msg = ' If a Trollhay account exists for ' + formData3.value.username + ', an e-mail will be sent with further instructions.!';

        }).catch(function () {
          // An error happened.
           // tslint:disable-next-line:max-line-length
           this.msg = ' If a Trollhay account exists for ' + formData3.value.username + ', an e-mail will be sent with further instructions.!';
        });
    }
  }

  ngOnInit() {
  }

}
