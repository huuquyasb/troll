import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { SuperSecretComponent } from './super-secret/super-secret.component';
import { SubscriberPageComponent } from './subscriber-page/subscriber-page.component';

import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { DashboarComponent } from './admin/dashboar/dashboar.component';
import { ForgotPasswordComponent } from './users/forgot-password/forgot-password.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { ProfileComponent } from './users/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ViewComponent } from './view/view.component';
import { ScrollableDirective } from './scrollable.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';

import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';

import { CanViewGuard } from './core/can-view.guard';
import { LogoutComponent } from './users/logout/logout.component';
const routes: Routes = [
  { path: 'content', component: SubscriberPageComponent, canActivate: [CanReadGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', canActivate: [CanViewGuard], component: LoginComponent },
  { path: 'register', canActivate: [CanViewGuard], component: RegisterComponent },
  { path: 'forgot-password', canActivate: [CanViewGuard], component: ForgotPasswordComponent },
  { path: 'view', component: ViewComponent },
  { path: 'view/:name', component: ViewComponent },
  { path: 'view/:name/:id', component: ViewComponent },
  { path: 'profile', canActivate: [AuthguardGuard], component: ProfileComponent },
  { path: 'secret', component: SuperSecretComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', canActivate: [AdminGuard], component: DashboarComponent },
  { path: '', component: HomeComponent },
  // { path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes)],
  declarations: [
      HomeComponent,
      ContactComponent,
      LogoutComponent,
      DashboarComponent,
      ForgotPasswordComponent,
      ProfileComponent,
      LoginComponent,
      LoadingSpinnerComponent,
      RegisterComponent,
      PageNotFoundComponent,
      ScrollableDirective,
      ViewComponent,
      SuperSecretComponent,
      SubscriberPageComponent
    ],
  providers: [UserService, AuthguardGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
