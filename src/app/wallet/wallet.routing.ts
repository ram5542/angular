import { Routes } from '@angular/router';
import { MainWalletTransactionsComponent } from './main-wallet/transactions/transactions.component';
import { WithdrawComponent } from './main-wallet/withdraw/withdraw.component';
import { PurchaseWalletTransactionsComponent } from './purchase-wallet/transactions/transactions.component';
import { FundTransferComponent } from './purchase-wallet/fund-transfer/fund-transfer.component';
import { IncomeComponent } from './main-wallet/income/income.component';
import { AddFundComponent } from './purchase-wallet/add-fund/add-fund.component';
import { DepositSummaryComponent } from './deposit-summary/deposit-summary.component';
import { FunjoTransferComponent } from './funjo-transfer/funjo-transfer.component';
import { GetFunjoBalanceComponent } from './get-funjo-balance/get-funjo-balance.component';
import { TransferToFunjoComponent } from './transfer-to-funjo/transfer-to-funjo.component';
import { FunjoTransactionComponent } from './funjo-transaction/funjo-transaction.component';
export const WalletRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'deposit-summary',
        component: DepositSummaryComponent
      },
      {
        path: 'funjo-transfer',
        component: FunjoTransferComponent
      },
      {
        path: 'get-funjo-balance',
        component: GetFunjoBalanceComponent
      },
      {
        path: 'transfer-to-funjo',
        component: TransferToFunjoComponent
      },
      {
        path: 'funjo-transaction',
        component: FunjoTransactionComponent
      },
      {
        path: 'main-wallet-transactions',
        component: MainWalletTransactionsComponent,
        data: {
          breadcrumb: 'Main Wallet Transactions'
        }
      },
      {
        path: 'payout-details',
        component: IncomeComponent,
        data: {
          breadcrumb: 'transactions'
        }
      },
      {
        path: 'cash-wallet-transactions',
        component: PurchaseWalletTransactionsComponent,
        data: {
          breadcrumb: 'transactions'
        }
      },
      {
        path:'add-fund',
        component:AddFundComponent,
        data: {
          breadcrumb: 'Add Fund'
       }
      },
      {
        path:'fund-transfer',
        component:FundTransferComponent,
        data: {
          breadcrumb: 'fund transfer'
       }
      },
      {
        path:'withdraw',
        component:WithdrawComponent,
        data: {
          breadcrumb: 'withdraw'
       }
      }       
    ]
      }
];