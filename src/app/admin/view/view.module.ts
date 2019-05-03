import {
    NgModule,Component 
  } from '@angular/core';
  import { AdminViewComponent } from './view.component';
  import {NbCardModule, NbStepperModule,NbActionsModule,NbPopoverModule} from '@nebular/theme'; 
  import { CommonModule } from '@angular/common';

  @NgModule({
    imports: [
      NbCardModule,
      NbStepperModule,
      NbActionsModule,
      NbPopoverModule,
      CommonModule
    ],
    declarations: [
      AdminViewComponent,
    ],
    providers: [],
  })
  export class AdminViewModule {}
