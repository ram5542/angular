import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USDTWalletTransactionsComponent } from './transactions/transactions.component';
import { AddFundUSDTComponent } from './add-fund/add-fund.component';
import { AddFundUSDTRoutes } from './usdt-wallet.routing';
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
    RouterModule.forChild(AddFundUSDTRoutes) 
    
  ],
  declarations: [AddFundUSDTComponent, USDTWalletTransactionsComponent]
})
export class USDTTopupModule { }
