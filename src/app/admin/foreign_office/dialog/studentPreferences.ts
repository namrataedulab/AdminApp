import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../../app/shared/api.service';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder } from '@angular/forms';
import { MoreCollegesDialogComponent } from './addMorePreference';
import {ConfirmationService} from 'primeng/api';

@Component({
selector: 'nb-dialog',
providers:[ConfirmationService],
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="600" [style.overflow]="'auto'" accent="success" size="xsmall" [nbSpinner]="loading" nbSpinnerStatus="success" nbSpinnerSize="xlarge"> 
<nb-card-header>
<div class="row">
  <div class="col-md-9" style="text-align:center;">Student Preferences List </div>
</div>
<button style="float:right;" nbButton shape="semi-round" size="xsmall" outline class="closeBtn ion-close-round" (click)="dismiss()"></button>
</nb-card-header>

  <nb-card-body>
    <div class="row">
      <ul type="none">
        <nb-list>
            <nb-list-item *ngFor="let pref of collegeListData">
                <div class="row">
                    <input type="radio" [(ngModel)]="collegeName" name="preferenceno" id="preferenceno" value="{{ pref.collegename }}"  > 
                        Preference No:{{ pref.Preference_no }} {{ pref.collegename }}
                </div>        
            </nb-list-item>
        </nb-list>
      </ul>
       <span *ngIf="preferences?.length ==0">No Preferences found !</span>
    </div>
    <br>
    <button nbButton hero status="primary" style="margin-left:15px;" *ngIf="college_length > 5" (click)="open()" >Add More</button>
    <button nbButton hero status="primary" style="margin-left:15px;" (click)="collegeAllocation()" >Save</button>
    <div style="text-align: center; font-weight: bold; font-size: 18px; margin-top: 20px; margin-bottom: 10px; ">Grant</div>
    <div class="row">
        <table class="table-bordered" >
            <thead>
                <tr>
                    <th><h4>College</h4></th>
                    <th><h4>Total Seats</h4></th>
                </tr>
            </thead>
            <br>
            <tbody>
                <tr *ngFor="let data of collegeListData" >
                    <th>
                        <p>
                            {{ data.Preference_no }}.
                            {{data?.collegename}}
                        </p>    
                    </th>
                    <td>
                        <p>
                            {{data?.seats}}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <p-confirmDialog [style]="{width: '425px'}"></p-confirmDialog> 
    <p-dialog [autoZIndex]="true" [(visible)]="display" [modal]="true" [responsive]="true" [style]="{width: '350px', minWidth: '200px'}">
        <span><h5>{{ dialog_Message }}</h5></span>
    </p-dialog>
  </nb-card-body>
</nb-card>
`,
})
export class PreferencesDialogComponent {
@Input() userid: string;
@Input() appid: string;
@Input() courseid: string;
@Input() specialization: string;
display: boolean = false;
dialog_Message :string='';
preferences;
Countries: any [];
cbse_country;
sscCountryValidation = true;
loading = false;
max;
college_length;
date;
collegeListData;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;
message;
collegeName;

constructor(protected ref: NbDialogRef<PreferencesDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
        this.loading = true;
        this.api.getTheme().subscribe((data: any) => {
            if(data['data']){
            this.themeService.changeTheme(data['data']);
            }else{
            this.themeService.changeTheme('default');
            }
        });
        
        this.adminApi.studentPreferencesList(this.userid,this.courseid,this.appid).subscribe(
            (data: any) => {
                this.preferences =  data['data'];
                this.college_length = data['college_length'];
                this.message = data['message'];
                this.collegeListData = this.sortJSON(this.preferences, 'Preference_no');
                this.loading = false;
                err => console.error(err)
        });
    
    }

    collegeAllocation(){
        
        if(!(this.collegeName == undefined)){
            this.confirmationService.confirm({
                message: 'Do you want to perform this action??',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.adminApi.collegeAllocation(this.collegeName, this.appid).subscribe((data: any) => {
                        if(data['status'] == 200){
                            this.dialog_Message = "Successfully Allocated !!!";
                            this.display = true;
                            this.ref.close();
                         
                        } else if(data['status'] == 400){  
                            this.dialog_Message = data['message'];
                            this.display = true;
                        }else{  
                            err => console.error(err)
                        }
                        
                    });
                    
                },
                reject: () => {}
            });
        }else{
            this.dialog_Message = "You have to allocate any respective college before saving it !";
            this.display = true;
        }    
        
    }

    open() {
        this.dialogService.open(MoreCollegesDialogComponent,{ 
          context: {
            userid : this.userid,
            appid : this.appid,
            courseid : this.courseid,
            specialization : this.specialization
          }
         }).onClose
            .subscribe(
              (data: any) => {
                this.ref.close();
                err => console.error(err)
            });
      }


    sortJSON(data, key) {
        return data.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    singleData(data){
        var data2 = [];
        var count1 = 0;
        for(var count = 0; count < data.length; count++){
            for( count1= 0; count1 < data2.length; count1++){
                if(data[count].collegename1 == data2[count1].collegename1){
                    break;
                }
            }
            data2[count1] = data[count];
        }
        return data2;
    }


}
