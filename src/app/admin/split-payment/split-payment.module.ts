import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPaymentComponent } from './split-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbCardModule,
  NbPopoverModule, 
  NbActionsModule,
  NbButtonModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {TabViewModule} from 'primeng/tabview';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from '../../pages/shared-authpipe.module';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    NbCardModule,
    TabViewModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxPaginationModule,
    SharedModule,
    NbPopoverModule, 
    NbActionsModule,
    NbButtonModule,
    MessagesModule,
    MessageModule,
    NbSpinnerModule,
  ],
  declarations: [SplitPaymentComponent],
  
})
export class SplitPaymentModule { }
