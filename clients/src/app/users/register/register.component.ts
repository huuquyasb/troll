import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) { }
  error: any;
  SignInEmailPassword(formData) {
    if (formData.valid) {
      this.auth.SignInEmailPassword(formData.value.username, formData.value.password, formData.value.displayname).then(
        (success) => {
          this.auth.updatedProfileDocument(success.uid, success.email, formData.value.displayname);
          this.router.navigateByUrl('');
        }).catch(
        (err) => {
          this.error = err.message;
        }
        );

    }
  }
  ngOnInit() {
  }

}


