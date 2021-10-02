import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainWalletTransactionsComponent } from './main-wallet/transactions/transactions.component';
import { WithdrawComponent } from './main-wallet/withdraw/withdraw.component';
import { PurchaseWalletTransactionsComponent } from './purchase-wallet/transactions/transactions.component';
import { FundTransferComponent } from './purchase-wallet/fund-transfer/fund-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WalletRoutes } from './wallet.routing'
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../shared/shared.module';
import { IncomeComponent } from './main-wallet/income/income.component';
import { AddFundComponent } from './purchase-wallet/add-fund/add-fund.component';
import { DepositSummaryComponent } from './deposit-summary/deposit-summary.component';
import { FunjoTransferComponent } from './funjo-transfer/funjo-transfer.component';
import { GetFunjoBalanceComponent } from './get-funjo-balance/get-funjo-balance.component';
import { TransferToFunjoComponent } from './transfer-to-funjo/transfer-to-funjo.component';
import { FunjoTransactionComponent } from './funjo-transaction/funjo-transaction.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(WalletRoutes),
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      SharedModule
  ],
  declarations: [
    MainWalletTransactionsComponent,
    WithdrawComponent,
    PurchaseWalletTransactionsComponent,
    FundTransferComponent,
    IncomeComponent,
    AddFundComponent,
    FunjoTransferComponent,
    DepositSummaryComponent,
    GetFunjoBalanceComponent,
    TransferToFunjoComponent,
    FunjoTransactionComponent
  ]
})

export class WalletModule {}