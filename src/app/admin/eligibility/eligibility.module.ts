import {
  NgModule,Component 
} from '@angular/core';
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';

//import {DataTableModule} from "angular-6-datatable";
import { AdminEligibilityComponent } from './eligibility.component';

import {NgxPaginationModule} from 'ngx-pagination';
import {CommonModule} from '@angular/common';
import {NbCardModule ,NbPopoverModule, NbActionsModule,NbButtonModule, NbSpinnerModule} from '@nebular/theme'; 
import {MatInputModule} from '@angular/material/input'; 
import { SharedModule } from '../../pages/shared-authpipe.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MatSelectModule } from '@angular/material';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    MatSelectModule,
    TabViewModule,
    TableModule,
    NbCardModule,
    CommonModule,
    NbActionsModule,
    MatInputModule,
    NbPopoverModule,
    NbButtonModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    InputTextareaModule,
    NbSpinnerModule,
    MatIconModule
  ],
  declarations: [
    AdminEligibilityComponent,
  ],
  providers: [],
})
export class AdminEligibilityModule {}
