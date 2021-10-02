import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { earringRoutes } from './earring.routing';
import { GrowthWalletComponent } from './growth-wallet/growth-wallet.component';
import { LevelWalletComponent } from './level-wallet/level-wallet.component';
import { ReferralWalletComponent } from './referral-wallet/referral-wallet.component';
import { TokenBonusComponent } from './token-bonus/token-bonus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(earringRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [GrowthWalletComponent,LevelWalletComponent,ReferralWalletComponent,TokenBonusComponent]
})
export class EarningModule { }
