import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartpaymentComponent } from './cartpayment.component';
import { FormsModule } from '@angular/forms';
import {NbStepperModule} from '@nebular/theme/components/stepper/stepper.module';
import {NbSpinnerModule} from '@nebular/theme';
import { NbContextMenuModule, NbListModule,
  NbDatepickerModule,
  NbSelectModule, 
  NbRadioModule ,
  NbDialogModule,
  NbInputModule,
NbCardModule} from '@nebular/theme';
import { NbAlertModule} from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Firstpaymentdialog } from './dialog/Firstpaymentdialog';

@NgModule({
  declarations: [
    CartpaymentComponent,
    Firstpaymentdialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbStepperModule,
    NbContextMenuModule,
    NbListModule,
    NbSelectModule,
    NbButtonModule,
    NbRadioModule,
    NbDatepickerModule,
    NbAlertModule,
    NgbModalModule,
    NbDialogModule.forRoot(),
    NbInputModule,
    NbSpinnerModule,
    NbCardModule
  ],
  entryComponents: [
    Firstpaymentdialog
  ]
})
export class CartpaymentModule { }
