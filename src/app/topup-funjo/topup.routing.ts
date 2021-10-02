import { Routes } from '@angular/router';
import { PackageSummaryComponent } from './package-summary/package-summary.component';
import { TopupFunjoComponent } from './topup-funjo/topup-funjo.component';
export const TopupRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'package-summary',
				component: PackageSummaryComponent,
			},
			{
				path: 'topup-funjo',
				component: TopupFunjoComponent,
			},
		]
	}
]