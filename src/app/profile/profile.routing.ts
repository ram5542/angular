import { Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { SponsorInfoComponent } from './sponsor-info/sponsor-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadKycComponent } from './upload-kyc/upload-kyc.component';
import { GenerateTransactionPasswordComponent } from './generate-transaction-password/generate-transaction-password.component';

export const ProfileRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'user-profile',
				component: UserProfileComponent,
			},
			{
				path: 'change-password',
				component: ChangePasswordComponent,
			},
			{
				path: 'sponsor-info',
				component: SponsorInfoComponent,
			},
			{
				path: 'upload-kyc',
				component: UploadKycComponent
			},
			{
				path: 'generate-transaction-password',
				component: GenerateTransactionPasswordComponent
			}
		]
	}
]