import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitQueryComponent } from './submit-query/submit-query.component';
import { TicketSummaryComponent,TicketHistoryComponent } from './ticket-summery/ticket-summery.component';
import { SupportRoutes } from './support.routing';
import { SharedModule } from '../shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';

import { ImageUploadModule } from 'angular2-image-upload';
import { Ng2ImgMaxModule } from 'ng2-img-max'
import { MyDatePickerModule } from 'mydatepicker';
import {keepHtmlModule} from '../../app/app.module';

@NgModule({
  imports: [
      ImageUploadModule,
      Ng2ImgMaxModule,
      MyDatePickerModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxPaginationModule,
      keepHtmlModule,
      SharedModule,
      RouterModule.forChild(SupportRoutes) 
  ],
  declarations: [
     SubmitQueryComponent,
     TicketSummaryComponent,
     TicketHistoryComponent
     // EscapeHtmlPipe
  ]
})

export class SupportModule {}