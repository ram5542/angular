import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopupFunjoComponent } from './topup-funjo/topup-funjo.component';
import { PackageSummaryComponent } from './package-summary/package-summary.component';
import { TopupRoutes } from './topup.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    RouterModule.forChild(TopupRoutes) 
    
  ],
  declarations: [TopupFunjoComponent,PackageSummaryComponent]
})
export class TopupModule { }
