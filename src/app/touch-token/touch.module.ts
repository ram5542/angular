import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouchRoutes } from './touch.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { TokenTransactionComponent } from './token-transaction/token-transaction.component';
import { TouchWithdrawComponent } from './touch-withdraw/touch-withdraw.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    RouterModule.forChild(TouchRoutes) 
    
  ],
  declarations: [TokenTransactionComponent,TouchWithdrawComponent]
})
export class TouchModule { }
