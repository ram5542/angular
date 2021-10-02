import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  SharedModule } from '../shared/shared.module';
import { GenealogyTreeComponent } from './genealogy/genealogy.component';
import { TreeUserModule } from './genealogy/tree-user/tree-user.module';
import { MyDirectsComponent,MyDownlineComponent } from './networks.component';
import { networksRoutes } from './networks.routing';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        TreeUserModule,
        CommonModule,
        RouterModule.forChild(networksRoutes),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [
    	MyDirectsComponent,MyDownlineComponent,
        GenealogyTreeComponent
    ]

})

export class NetworksModule {}
