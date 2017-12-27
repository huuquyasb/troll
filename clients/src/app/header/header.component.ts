import { Component } from '@angular/core';
// import { AppRoutingModule } from '../app-routing/app-routing.module';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'app';

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthService,  private router: Router) {
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
