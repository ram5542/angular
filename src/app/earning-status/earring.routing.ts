import { Routes } from '@angular/router';
import { GrowthWalletComponent } from './growth-wallet/growth-wallet.component';
import { LevelWalletComponent } from './level-wallet/level-wallet.component';
import { ReferralWalletComponent } from './referral-wallet/referral-wallet.component';
import { TokenBonusComponent } from './token-bonus/token-bonus.component';
export const earringRoutes: Routes = [
  {
     path: '',
     children:[
        {
           path: 'growth-wallet',
           component: GrowthWalletComponent 
        },
        {
            path: 'level-wallet',
            component: LevelWalletComponent  
        },
        {
            path: 'referral-wallet',
            component: ReferralWalletComponent
        },
        {
            path: 'token-bonus',
            component: TokenBonusComponent
        }
     ]
  }];







