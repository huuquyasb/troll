import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) {
    const logged = this.auth.checkLogged();
    if (logged) {
        this.router.navigateByUrl('');
    }
  }
  // tslint:disable-next-line:member-ordering
  error: any;
  loginEmailPassword(formData2) {
    if (formData2.valid) {
      this.auth.emailLogin(formData2.value.username, formData2.value.password).then(
        (success) => {
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

