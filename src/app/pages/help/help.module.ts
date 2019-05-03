import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { HelpComponent } from './help.component';
import { NbListModule, 
  NbButtonModule, 
  NbActionsModule, 
  NbInputModule,
  NbChatModule, 
  NbSelectModule} from '@nebular/theme';
import { ViewTicketComponent } from './viewTicket/viewTicket.component';
import { NewTicketComponent } from './newTicket/newTicket.component';
import { ChatComponent } from '../chat/chat.component';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../../pages/shared-authpipe.module';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
      ThemeModule,
      NbListModule,
      NbButtonModule,
      NbActionsModule,
      NbInputModule,
      NbChatModule,
      RouterModule,
      MatSelectModule,
      NgxPaginationModule,
      NbSelectModule,
      SharedModule,
      MatInputModule,
      MatIconModule
    ],
    declarations: [HelpComponent,ViewTicketComponent,NewTicketComponent,ChatComponent],
    providers: [],
    entryComponents: [
      NewTicketComponent
    ],
  })
  export class HelpModule {
  }