import { Routes } from '@angular/router';
import { MazumaCoinTransactionComponent } from './mazuma-coin-transaction/mazuma-coin-transaction.component';
import { MazumaCoinWithdrawComponent } from './mazuma-coin-withdraw/mazuma-coin-withdraw.component';
export const MazumaCoinRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'mazuma-coin-transaction',
				component: MazumaCoinTransactionComponent,
			},
			{
				path: 'mazuma-coin-withdrawal',
				component: MazumaCoinWithdrawComponent,
			}
			
		]
	}
]