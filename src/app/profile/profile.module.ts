import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { SponsorInfoComponent } from './sponsor-info/sponsor-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyDatePickerModule } from 'mydatepicker';
import { UploadKycComponent } from './upload-kyc/upload-kyc.component';
import { ProfileRoutes } from './profile.routing';
import {
  MatListModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatMenuModule,
  MatToolbarModule,
  MatTreeModule,
  MatTabsModule,
  MatTooltipModule, 
  MatTableModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatDividerModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatNativeDateModule
 } from "@angular/material";
import { GenerateTransactionPasswordComponent } from './generate-transaction-password/generate-transaction-password.component';
@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(ProfileRoutes),
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      MatListModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSortModule,
      MatIconModule,
      MatButtonModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      MatDatepickerModule,
      MatRadioModule,
      MatSelectModule,
      MatMenuModule,
      MatToolbarModule,
      MatTreeModule,
      MatTabsModule,
      MatNativeDateModule,
      MatTooltipModule, 
      MatTableModule,
      MatProgressBarModule,
      MatSidenavModule,
      MatDividerModule,
      MatGridListModule,
      MatSlideToggleModule,
      MatCardModule,
      MatFormFieldModule,
      MyDatePickerModule
  ],
  declarations: [
      	  UserProfileComponent,
          SponsorInfoComponent,
          ChangePasswordComponent,
          UploadKycComponent,
          GenerateTransactionPasswordComponent
  ]
})
export class ProfileModule{}