import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from './shared/service/authguard/authguard.service';
 import { AuthComponent } from './authentication/authentication.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
 export const AppRoutes: Routes=[
		{ 		
			path:'',
			redirectTo:'auth',
			pathMatch:'full',
		},{
			path: 'admin',
			component:AdminLoginComponent
		},
			{
			path:'',
			component:LayoutComponent,
			canActivateChild:[AuthGuardService],
			children:[
				{
					path: '',
					redirectTo: 'dashboard',
					pathMatch: 'full'		
				},
				{
					path: '',
					loadChildren: './dashboard/dashboard.module#DashboardModule'
				},
				{
					path: '',
					loadChildren: './support/support.module#SupportModule'
				},
				{
					path: '',
					loadChildren: './networks/networks.module#NetworksModule'
				},
				{
					path: '',
					loadChildren: './earning-status/earning.module#EarningModule'
				},
				 {
					path: '',
					loadChildren: './topup-funjo/topup.module#TopupModule'
				},
				 {
					path: '',
					loadChildren: './touch-token/touch.module#TouchModule'
				 },
				{
					path: 'profile',
					loadChildren: './profile/profile.module#ProfileModule'
				},
				{
					path: '',
					loadChildren: './wallet/wallet.module#WalletModule'
				},
				{
					path: '',
					loadChildren: './mazuma-coin/mazuma-coin.module#MazumaCoinModule'
				},
				{
					path: '',
					loadChildren: './usdt-wallet/usdt-wallet.module#USDTTopupModule'
				}
			]
		},
		{
			path:'',
			component:AuthComponent,
			children:[
			{
				path:'**',
				loadChildren:'./authentication/authentication.module#AuthenticationModule'
			}]
		}
]