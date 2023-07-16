import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from '../shared/services/auth.service';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LayoutComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class AuthModule {}
