import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../../app/shared/api.service';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';
import { config } from '../../../../../config';
@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="500" [style.overflow]="'auto'" accent="success" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xlarge"> 
<nb-card-header>
    <div class="row">
        <div class="col-md-9" style="text-align:center;">Payment Details </div>
    </div>
    <button style="float:right;" nbButton shape="semi-round" size="xsmall" outline class="closeBtn ion-close-round" (click)="dismiss()"></button>
</nb-card-header>
  <nb-card-body>
    <div class="row">
    <table class="" border="1" bordercolor="#c4c4c4" style="width:100%" *ngIf='split == "0"'>
        <thead>
            <tr>
                <th style="width: 30%;padding: 8px;">Date of Payment :</th>
                <td style="width: 60%;padding: 8px;"><span id="date_of_payment">{{ trans1?.dateOfPayment }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Transaction Id :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_transaction_id">{{ trans1?.transaction_id }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Currency :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_currency">{{ trans1?.currency }}</span></td>
            </tr>
            
            <tr>
                <th style="width: 30%;padding: 8px;">Total Amount :</th>
                <td style="width: 60%;padding: 8px;"><span id="amount">{{ trans1?.amount }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Challan : </th>
                <td style="width: 60%;padding: 8px;">
                   <span *ngIf="!(trans1?.challanExist == true)">Challan not uploaded</span>
                   <a  href="{{serverUrl}}/{{trans1?.challanName}}"  *ngIf="!(trans1?.challanExist == false)">Download</a>
                </td>
            </tr>
        </thead>
    </table>
    <table class="" border="1" bordercolor="#c4c4c4" style="width:100%" *ngIf='split == "1"'>
        <thead>
            <tr>
                <th style="width: 30%;padding: 8px;">Date of Payment :</th>
                <td style="width: 60%;padding: 8px;"><span id="date_of_payment">{{ trans1?.dateOfPayment }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Transaction Id :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_transaction_id">{{ trans1?.transaction_id }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Currency :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_currency">{{ trans1?.currency }}</span></td>
            </tr>
            
            <tr>
                <th style="width: 30%;padding: 8px;">Total Amount :</th>
                <td style="width: 60%;padding: 8px;"><span id="amount">{{ trans1?.amount }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Challan : </th>
                <td style="width: 60%;padding: 8px;">
                   <span *ngIf="!(trans1?.challanExist == true)">Challan not uploaded</span>
                   <a  href="{{serverUrl}}/{{trans1?.challanName}}"  *ngIf="!(trans1?.challanExist == false)">Download</a>
                </td>
            </tr>
        </thead>
    </table>
    <br>
    <br>
    <table class="" border="1" bordercolor="#c4c4c4" style="width:100%" *ngIf='split == "1"'>
        <thead>
            <tr>
                <th style="width: 30%;padding: 8px;">Date of Payment :</th>
                <td style="width: 60%;padding: 8px;"><span id="date_of_payment">{{ trans2?.dateOfPayment }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Transaction Id :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_transaction_id">{{ trans2?.transaction_id }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Currency :</th>
                <td style="width: 60%;padding: 8px;"><span id="t_currency">{{ trans2?.currency }}</span></td>
            </tr>
            
            <tr>
                <th style="width: 30%;padding: 8px;">Total Amount :</th>
                <td style="width: 60%;padding: 8px;"><span id="amount">{{ trans2?.amount }}</span></td>
            </tr>
            <tr>
                <th style="width: 30%;padding: 8px;">Challan : </th>
                <td style="width: 60%;padding: 8px;">
                   <span *ngIf="!(trans2?.challanExist == true)">Challan not uploaded</span>
                   <a  href="{{serverUrl}}/{{trans2?.challanName}}"  *ngIf="!(trans2?.challanExist == false)">Download</a>
                </td>
            </tr>
        </thead>
    </table>
    </div>
    <br>
  </nb-card-body>
</nb-card>
`,
})
export class PaymentDetailsDialogComponent {
@Input() course_id : string;
@Input() split : string; 
@Input() application_id : string; 
@Input() challan: string;

loading = false;
trans1 ;
trans2 ;
    serverUrl: string;


constructor(protected ref: NbDialogRef<PaymentDetailsDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  public themeService : NbThemeService,) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
        this.serverUrl = config.serverUrl
        this.loading = true;
        this.adminApi.get2ndPaymentDetails(this.application_id,this.course_id,this.split)
        .subscribe(data => {
            this.loading = false;
            if(data['status'] == 200){
                this.trans1 = data['data']['trans1'][0];
                this.trans2 = data['data']['trans2'][0];
            }else if(data['status'] == 400){
                this.ref.close('error');
            }
        });
    }

    downloadChallan(challanName){
        var filename = challanName.split('/').pop();
        this.adminApi.downloadChallan(challanName).subscribe(data => {
            saveAs(data,filename);  
        });
    }
    

}
