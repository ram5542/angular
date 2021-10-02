import { Routes } from '@angular/router';

import { SubmitQueryComponent } from './submit-query/submit-query.component';
import { TicketSummaryComponent,TicketHistoryComponent } from './ticket-summery/ticket-summery.component';

export const SupportRoutes: Routes = [
  {
    path: 'support',
    children: [
      {
        path: 'submit-query',
        component: SubmitQueryComponent,
        data: {
          breadcrumb: 'submit-query'
        }
      },
      {
        path:'ticket-summary',
        component:TicketSummaryComponent,
        data: {
          breadcrumb: 'ticket-summary'
       }
      },
      {
        path: 'ticket-history/:id',
        component: TicketHistoryComponent,
        data: {
          breadcrumb: 'ticket-history'
       }
      }

       
    ]
      }
];