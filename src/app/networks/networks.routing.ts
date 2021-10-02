import { Routes } from '@angular/router';

import { GenealogyTreeComponent } from './genealogy/genealogy.component';
import { TreeUserModule } from './genealogy/tree-user/tree-user.module';
import { MyDirectsComponent,MyDownlineComponent } from './networks.component';


export const networksRoutes: Routes = [
  {
     path: '',
     children:[
        {
           path: 'genealogy-tree',
           component: GenealogyTreeComponent 
        },
        {
            path: 'referrals',
            component: MyDirectsComponent  
        },
        {
            path: 'downline',
            component: MyDownlineComponent
        }
     ]
  }];







