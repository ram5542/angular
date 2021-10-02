import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './authentication.component';
import{ ForgotComponent } from './forgot/forgot.component';
import { AuthenticationRoutes } from './authentication.routing';
import { LoginComponent } from './login/login.component';
 import { RegisterComponent } from './registeration/register.component';

 import { NgxHmCarouselModule } from 'ngx-hm-carousel';

import { SharedModule } from '../shared/shared.module';
import { FieldErrorDisplayComponent } from '../shared/field-error-display/field-error-display.component';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxHmCarouselModule,
    ParticlesModule
  ],
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    ForgotComponent
  ]
})

export class AuthenticationModule {}

