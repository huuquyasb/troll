import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
// Router
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
// import { AppRoutingModule } from './app-routing/app-routing.module';
// Adding the Firebase Database and Auth Modules
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';
import { ViewComponent } from './view/view.component';
import { PaginationComponent } from './pagination/pagination.component';

import { CoreModule } from './core/core.module';
import {PaginationService} from './pagination.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PaginationComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'trollhay.net'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AppRoutingModule,

  ],
  providers: [UserService, AuthguardGuard, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
