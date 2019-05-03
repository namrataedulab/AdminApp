import {
  NgModule
} from '@angular/core';

import {NbCardModule ,NbPopoverModule, NbActionsModule, NbButtonModule,} from '@nebular/theme'; 
import {MatSelectModule} from '@angular/material/select';
import { AdminDownloadComponent } from './download.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    NbCardModule,
    NbPopoverModule,
    NbActionsModule,
    NbButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminDownloadComponent,
  ],
  providers: [],
})
export class AdminDownloadModule {}
