import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import { CanReadGuard } from './can-read.guard';
import { CanViewGuard } from './can-view.guard';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AdminGuard, CanReadGuard, CanViewGuard]
})
export class CoreModule { }
