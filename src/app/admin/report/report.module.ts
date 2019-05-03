import {
  NgModule
} from '@angular/core';
import {
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbAlertModule,
  NbCardModule,
  NbTabsetModule,
  NbListModule,
  NbActionsModule,
  NbSpinnerModule,
  NbPopoverModule
} from '@nebular/theme';  
import {
  NbDatepickerModule
} from '@nebular/theme/components/datepicker/datepicker.module';
import { MatDatepickerModule , MatNativeDateModule } from '@angular/material';
import { AdminReportComponent } from './report.component';
import { MatInputModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import {TabViewModule} from 'primeng/tabview';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../../pages/shared-authpipe.module';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  imports: [
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
    NbCardModule,
    NbTabsetModule,
    NbListModule,
    NbActionsModule,
    NbPopoverModule,
    MatInputModule,
    NgxPaginationModule,
    TabViewModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NbSpinnerModule,
    MatSelectModule,
    NbDatepickerModule,
    MatDatepickerModule ,
    MatNativeDateModule
  ],
  declarations: [
    AdminReportComponent,
  ],
  providers: [],
})
export class AdminReportModule {}
