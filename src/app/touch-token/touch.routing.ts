import { Routes } from '@angular/router';
import { TokenTransactionComponent } from './token-transaction/token-transaction.component';
import { TouchWithdrawComponent } from './touch-withdraw/touch-withdraw.component';
export const TouchRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'token-transaction',
				component: TokenTransactionComponent,
			},
			{
				path: 'touch-withdrawal',
				component: TouchWithdrawComponent,
			}
			
		]
	}
]