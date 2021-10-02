import { Routes } from '@angular/router';
import { USDTWalletTransactionsComponent } from './transactions/transactions.component';
import { AddFundUSDTComponent } from './add-fund/add-fund.component';
export const AddFundUSDTRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'usdt-transactions',
				component: USDTWalletTransactionsComponent,
			},
			{
				path: 'app-add-fund-usdt',
				component: AddFundUSDTComponent,
			},
		]
	}
]