import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { keepHtmlModule } from '../../app/app.module';
import { ClipboardModule } from 'ngx-clipboard';

import { ImageUploadModule } from 'angular2-image-upload';
import { Ng2ImgMaxModule } from 'ng2-img-max'
import * as $ from 'jquery';

/*import { DashboardResolve } from './dashboard-resolve.service';*/

@NgModule({
    imports: [
        CommonModule,
		keepHtmlModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule,
        ImageUploadModule,
        Ng2ImgMaxModule
       ],
       exports: [
         ClipboardModule,
       ],
    declarations: [DashboardComponent]/*,
    providers: [DashboardResolve]*/
})

export class DashboardModule {}
