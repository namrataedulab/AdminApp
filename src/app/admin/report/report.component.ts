import { Component , ViewChild } from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { NativeDateAdapter, DateAdapter, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
import { config } from '../../../../config';
import {Data} from '../../shared/data';

const moment = _moment;

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = 'MMMM YYYY';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class AdminReportComponent {
  
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  application_data: any;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;
  p4: number = 1;
  p5: number = 1;
  p6: number = 1;
  p7: number = 1;
  p8: number = 1;
  p9: number = 1;
  p10: number = 1;
  tab_type: any;
  activity_data: any;
  firstPaymentChallanData: any;
  secondPaymentChallanData: any;
  collegeAttendedStudents: any;
  tableData: any;
  options: any = {};
  themeSubscription: any;
  selectedYear: any ='2019';
  emailActivityData : any;
  loadingbutton;
  yesterday;
  month;
  year;
  smsActivityData: any;
  smsshow = 0;
  constructor(
    protected adminApi : AdminApiService,
    private router : Router,
    private theme: NbThemeService,
    private authService : NbAuthService,
    private globalVar : Data,
		private route : ActivatedRoute,
    ) { 
      this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
        if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
          this.router.navigate(['auth/logout'])
        }
      });
  }

  @ViewChild(MatDatepicker) picker;
  date = new FormControl();

  monthSelectedSMS(params) {
    this.date.setValue(params);
    this.picker.close();
    this.smsshow = 0;
    this.loadingbutton = true;
    this.adminApi.getSMSActivityMonthWise(params).subscribe(data=> {
      this.loadingbutton = false;
      if(data['status'] == 200){
        this.smsshow = 1
        this.smsActivityData = data['data'];
      }else if(data['status'] == 400){
        this.smsshow = 0;
       
      }else{
        this.smsshow = 0;
      }
      
    });
  }

  ngOnInit(){
    this.filterText = "";
    this.adminApi.getApplicationsByStatus(2019).subscribe(data=> {
      this.application_data = data['data'];
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    })
  }

  filterYearWise(year){
    this.adminApi.getApplicationsByStatus(year).subscribe(data=>{
      this.application_data = data['data'];
    })
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  paymentFilter(type,year){
    if(type=='first'){
      this.adminApi.firstPaymentChallanData(year).subscribe(data=> {
        this.firstPaymentChallanData = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })

    }else if(type=='second'){
      this.adminApi.secondPaymentChallanData(year).subscribe(data=> {
        this.secondPaymentChallanData = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }
   
  }


  DownloadFistChallan(user_id,id,value){
    var name = value.split("/").pop();
    var url = config.fileUrl+'/public/upload/transcript/'+user_id+'/'+id+'_First_Online_Payment_Challan.pdf'
    this.adminApi.downloadFiles(url)
    .subscribe(data => {
     saveAs(data, id+'_First_Online_Payment_Challan.pdf');    
    });
  }

  DownloadSecondChallan(value){
    var name = value.split("/").pop();
    var value1 = value;
    this.adminApi.downloadFiles(value1)
    .subscribe(data => {
     saveAs(data, name);    
    });
  }
  
  getReportData(e){
    var index = e.index;
    if(index == 0){
      this.adminApi.getApplicationsByStatus(this.selectedYear).subscribe(data=> {
        this.application_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 1){
      this.adminApi.getApplicationAcceptance(this.selectedYear).subscribe(data=> {
        this.application_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 2){
      this.adminApi.getApplication('new',this.selectedYear).subscribe(data=>{
       this.application_data = data['data'];
     })
       this.filterInput
       .valueChanges
       .debounceTime(200)
       .subscribe(term => {
       this.filterText = term;
     });
    }else if(index == 3){
     this.adminApi.getApplicationinEligibility('new',this.selectedYear).subscribe(data=>{
       this.application_data = data['data'];
     })
     this.filterText = "";
     this.filterPlaceholder = "Search";
     this.filterInput
       .valueChanges
       .debounceTime(200)
       .subscribe(term => {
       this.filterText = term;
     });
    }else if(index == 4){
      this.tab_type = 'email_activity';
      this.loadingbutton = true;
      this.adminApi.getEmailTracker().subscribe(data =>{
        this.emailActivityData = data['data']['messages'];
        this.loadingbutton = false;
      });
    }else if(index == 5){
      this.adminApi.studentStatisticsPiechart().subscribe(data=> {
        this.tableData = data['data']['tableData'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 6){
      this.adminApi.activitytracker().subscribe(data=> {
        this.activity_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 7){
      this.adminApi.firstPaymentChallanData(this.selectedYear).subscribe(data=> {
        this.firstPaymentChallanData = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 8){
      this.adminApi.secondPaymentChallanData(this.selectedYear).subscribe(data=> {
        this.secondPaymentChallanData = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 9){
      this.adminApi.collegeAttendedStudents().subscribe(data=> {
        this.collegeAttendedStudents = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 10){
      this.tab_type = 'sms_activity';
      var today = new Date();
			var date = today.getDate() ;
			var month = today.getMonth() + 1;
			var year = today.getFullYear();
			var yesterday = date - 1;
			this.yesterday = yesterday;
			this.month = month;
			this.year = year;
    }
    
  }
  
  viewMore(category,userId,courseId,tab,applicationId){
    this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
  }

  filterYear(tab,tab_type,year){
    if(tab === 'app'){
      this.adminApi.getApplication(tab_type,year).subscribe(data=>{
        this.application_data = data['data'];
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(tab === 'eligib'){
      this.adminApi.getApplicationinEligibility(tab_type,year).subscribe(data=>{
        this.application_data = data['data'];
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }   
  }

  downloadEmailExcel(){
    this.loadingbutton = true;
    this.adminApi.downloadEmailExcel().subscribe(data=> { 
      var value = data['data'];
      var name = value.split("/").pop();
      this.adminApi.downloadFiles(value)
      .subscribe(data => {
        this.loadingbutton = false;
      saveAs(data, name);    
      });
    });
  }

}