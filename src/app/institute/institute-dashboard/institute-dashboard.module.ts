import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { InstituteDashboardComponent } from './institute-dashboard.component';
import { NbCardModule,NbButtonModule } from '@nebular/theme';
import {TableModule} from 'primeng/table';
import {DataTableModule} from "angular-6-datatable";
import { SharedModule } from '../../pages/shared-authpipe.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [InstituteDashboardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    NgxPaginationModule,
    NbCardModule,
    TableModule,
    DataTableModule,
    SharedModule,
    MatFormFieldModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class InstituteDashboardModule { }
