import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazumaCoinRoutes } from './mazuma-coin.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { MazumaCoinTransactionComponent } from './mazuma-coin-transaction/mazuma-coin-transaction.component';
import { MazumaCoinWithdrawComponent } from './mazuma-coin-withdraw/mazuma-coin-withdraw.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    RouterModule.forChild(MazumaCoinRoutes) 
    
  ],
  declarations: [MazumaCoinTransactionComponent,MazumaCoinWithdrawComponent]
})
export class MazumaCoinModule { }
