import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { TableComponent } from './table/table.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { CheckAuthorizationOnClickDirective } from './checkAuth.directive';

import { PowerPipe } from './pipes/power.pipe';
@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule
  ],
  declarations: [
      FieldErrorDisplayComponent,
      ValidationFormsComponent,
      TableComponent,
      CheckAuthorizationOnClickDirective,
      PowerPipe
  ],
  exports: [
      FormsModule,
      ReactiveFormsModule,
      FieldErrorDisplayComponent,
      ValidationFormsComponent,
      TableComponent,
      PowerPipe,
      CheckAuthorizationOnClickDirective

  ],
  providers: [

  ]
})
export class SharedModule { }


