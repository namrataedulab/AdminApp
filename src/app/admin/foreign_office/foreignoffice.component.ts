import {Component ,OnInit , ElementRef , ViewChild} from '@angular/core';
import { AdminApiService } from '../../../app/shared/adminapi.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { CountriesService } from './../../@core/data/countries.service'; 
import { saveAs } from 'file-saver';
import { PreferencesDialogComponent } from './dialog/studentPreferences';
import { ThirdPaymentDetailsDialogComponent } from './dialog/third_payment_details';
import { PaymentDetailsDialogComponent } from './dialog/paymentDetails';
import { EducationDetailsDialogComponent } from './dialog/education_details';
import { NbDateService, NbDialogService, NbToastrService,NbStepperComponent,NbThemeService } from '@nebular/theme';
import {ConfirmationService} from 'primeng/api';
import * as $ from 'jquery';
import { FormGroup, FormControl } from '@angular/forms';
import { ICCRPreferencesDialogComponent } from './dialog/iccr_student_preferences';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { config } from '../../../../config';

@Component({
  selector: 'adminForeignOffice',
  templateUrl: './foreignoffice.component.html',
  styleUrls: ['./foreignoffice.component.scss'],
  providers: [ConfirmationService]
})
export class AdminForeignOfficeComponent {
  tab_type;
  application_data;
  Countries;
  country;
  embassy;
  embassyEmailList;
  p: number = 1;
  p1: number = 1;
  p2: number = 1;
  p3: number = 1;
  selectedYear ='2019';
  dialog_Message:string;
  display: boolean = false;
  tab1:boolean;
  tab2:boolean;
  tab3:boolean;
  tab4:boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  index: any;
  router: any;
  serverUrl: string;
  oldserverUrl: string;
 // @ViewChild('embassyEmail') input :ElementRef; 
  constructor(protected adminApi : AdminApiService, 
              protected countries : CountriesService,
              private confirmationService: ConfirmationService,
              @Inject(DOCUMENT) document,
              private dialogService: NbDialogService,
              private authService : NbAuthService) { 
              this.Countries = this.countries.getData();
              this.authService.onTokenChange()
                  .subscribe((token: NbAuthJWTToken) => {
                  if(token.getPayload()['role'] !="admin"){
                    this.router.navigate(['auth/logout'])
                  }
              });
  }

  ngOnInit(){
    this.serverUrl = config.serverUrl;
    this.oldserverUrl = config.oldserverUrl;
    this.filterText = "";
    this.filterPlaceholder = "Search";
    var obj = {
      index: 0
    };
    this.getApplicationAcceptedForeignOffice(obj);
  }
  
  getApplicationAcceptedForeignOffice(e) {
    this.index = e.index;
   
    if(this.index == 0){
      this.tab_type = 'seat_allocation'
    }else if(this.index == 1){
      this.tab_type = 'document_verification'
    }else if(this.index == 2){
      this.tab_type = 'third_payment'
    }else if(this.index == 3){
      this.tab_type = 'iccr_seat_allocation'
    }

    this.adminApi.getApplicationinForeignOffice(this.tab_type,this.selectedYear).subscribe(data=>{
      this.application_data = data['data'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  filterYear(tab_type,year){
    this.adminApi.getApplicationinForeignOffice(tab_type,year).subscribe(data=>{
      this.application_data = data['data'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  

  getPaymentDetails(application_id,course_id,split){
    this.dialogService.open(PaymentDetailsDialogComponent,{ 
        context: {
          course_id : course_id,
          split : split,
          application_id : application_id
        }
     }).onClose
        .subscribe(
          (data: any) => {
            if(data == 'error'){
              alert("There is some problem in fetching payment details");
            }       
            err => console.error(err)
        });

  }

  sendEmailTostudent(event: any,user_id,course_id,id,specialization){
    if (event.target.checked){
      this.adminApi.sendEmailFromForeignOffice('student',user_id,course_id,id).subscribe(data=>{
    
        if(data['status'] == 200){
          alert("Email sent successfully to student");
        }  
      });
    }
  }

  sendEmailToGuardian(event: any,user_id,course_id,id,specialization){
    
    if (event.target.checked){
      this.adminApi.sendEmailFromForeignOffice('guardian',user_id,course_id,id).subscribe(data=>{
        if(data['status'] == 200){
            alert("Email sent successfully to guardian");
        }  
      });

    }
  }

  sendEmailToEmbassy(user_id,course_id,id,specialization){
    document.getElementById("country"+id).style.display = "block";
  }

  sendEmailembassy(id,user_id,course_id,Embemail,Contryvalue,input_email){
    document.getElementById("emailerror"+id).innerHTML = "";
   
    var valid = true;
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = input_email; //$('#input_email'+id).val()

    if(email == ""){
      valid = false;
      document.getElementById("emailerror"+id).innerHTML = "Email is required";
    }else if(!mailformat.test(email)){
      valid = false;
      document.getElementById("emailerror"+id).innerHTML = "Invalid Email";
    }else if(email.length > 100){
      valid = false;
      document.getElementById("emailerror"+id).innerHTML = "Email less than 100 characters";
    }
          
    var country = document.getElementById("country"+id);
    if(valid){
      this.adminApi.sendEmailToEmbassy(user_id,course_id,id,email,Contryvalue).subscribe(data=>{
        if(data['status'] == 200){
          alert("Email sent successfully to Embassy");
        }  else {
          alert("Email not sent to guardian");
        }
      });
        
    }
  }

  sendEmailembassy1(id,user_id,course_id,Embemail,Contryvalue,input_email){
    document.getElementById("emailerror"+id).innerHTML = "";
    //embassyEmail
    var valid = true;
    var email = input_email;
    
    if(email = ''){
      valid = false;
      document.getElementById("emailerror").innerHTML = "Email is required";
    }

    if(valid){
      this.adminApi.sendEmailToEmbassy(user_id,course_id,id,email,Contryvalue).subscribe(data=>{
        if(data['status'] == 200){
          alert("Email sent successfully to Embassy");
        }  else {
          alert("Email not sent to guardian");
        }
      });
        
    }
  }

  viewHSCDetails(userid,qualification,percentage,Subject_first,mark_first,OutOf_first,grade_first,Subject_Second,mark_Second,
    OutOf_Second,grade_Second,Subject_Third,mark_Third,OutOf_Third,grade_Third,Subject_fourth,mark_fourth,OutOf_fourth,
    grade_fourth,Subject_fifth,mark_fifth,OutOf_fifth,grade_fifth,Subject_Six,mark_Six,OutOf_Six,grade_Six,college_university){
      this.dialogService.open(EducationDetailsDialogComponent,{ 
        context: {
          userid : userid,
          qualification : qualification,
          percentage : percentage,
          Subject_first : Subject_first,
          mark_first : mark_first,
          OutOf_first : OutOf_first,
          grade_first : grade_first,
          Subject_Second: Subject_Second,
          mark_Second: mark_Second,
          OutOf_Second: OutOf_Second,
          grade_Second: grade_Second,
          Subject_Third: Subject_Third,
          mark_Third: mark_Third,
          OutOf_Third: OutOf_Third,
          grade_Third: grade_Third,
          Subject_fourth: Subject_fourth,
          mark_fourth: mark_fourth,
          OutOf_fourth: OutOf_fourth,
          grade_fourth: grade_fourth,
          Subject_fifth: Subject_fifth,
          mark_fifth: mark_fifth,
          OutOf_fifth: OutOf_fifth,
          grade_fifth: grade_fifth,
          Subject_Six: Subject_Six,
          mark_Six: mark_Six,
          OutOf_Six: OutOf_Six,
          grade_Six: grade_Six,
          college_university: college_university,
        }
    }).onClose
        .subscribe(
          (data: any) => {
      
            err => console.error(err)
        });
  }

  getEmail(event,id){
    var value = event;
     
    document.getElementById("emailerror"+id).innerHTML = null;
     	if (value == 'Not exists in list') {
				document.getElementById("input_email"+id).style.display = "block";
				document.getElementById("sendEmail"+id).style.display = "block";
				document.getElementById("sendEmail1"+id).style.display = "none";

			} else {
				document.getElementById("sendEmail1"+id).style.display = "block";
				document.getElementById("input_email"+id).style.display = "none";
				document.getElementById("sendEmail"+id).style.display = "none";
			}
  }

  deallocateCollege(application_id,user_id,collegename){
    this.confirmationService.confirm({
      message: 'Do you want to perform this action??',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminApi.studentDeallocateCollege(application_id,user_id,collegename).subscribe(data=>{
          if(data['status'] == 200){
            this.ngOnInit();
          }  else {
            alert("Error on server");
          }
        });
      },
      reject: () => {
          
      }
  });
								
  }

  downloadletter(id,type,applicationid){
    if(type == "Provisional_Letter"){
      var file_name = applicationid+"_Confirmation_provisional_Letter.pdf";
      var file_location = id+"";
      this.adminApi.downloadDocument(id,file_name)
      .subscribe(data => {
        saveAs(data, file_name);    
      });
    }
      
  }

  downloadSeatAllocationDraft(userid,enrollment,id){
      var file_name = enrollment+'_seat_allocate_details.pdf';
      this.adminApi.downloadAllocationDraftLetter(userid,enrollment,id)
      .subscribe(data => {
        //constant.BASE_URL_UISERVER+'upload/transcript/'+user_id+'/'+enrollment_no+'_seat_allocate_details.pdf'
        var myInput = document.getElementById('seatAllo'+id);
        myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+userid+'/'+enrollment+'_seat_allocate_details.pdf');
        // saveAs(data, file_name);    
      });
    }

  downloadFirmLetter(userid,specialization,id){
      var file_name = id+'_Final_Letter.pdf';
      this.adminApi.checkDownloadedFirmLetter(userid, specialization, id)
      .subscribe(data => {
        if(data['status'] == 200){
          var myInput = document.getElementById('firmlet'+id);
          myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+userid+'/'+id+'_Final_Letter.pdf');
          // this.adminApi.downloadFirmLetter(userid, file_name)
          // .subscribe(data => {
          //     saveAs(data, file_name);
          // });
         

        }  else if(data['status'] == 400) {
          this.dialog_Message ="You can't download firm letter until director allocate the college.";
          this.display = true;
          //alert(" 400 on server");

        } else if(data['status'] == 401){
          $("#input_college_fees"+id).val(data['data'].fees);
          $("#course_fees_id"+id).val(data['data'].id);
          //document.getElementById("firmletterdownload"+id).value ='';
          document.getElementById("firmletterdownload"+id).style.display = "none";
          document.getElementById("input_college_fees"+id).style.display = "block";
          document.getElementById("generateFirmFeesUpdate"+id).style.display = "block";

        } else if(data['status'] == 402){
          //alert("402 on server");
          this.dialog_Message ="You can't generate firm letter until student verify all required documents.";
          this.display = true;

        } else{
          this.dialog_Message ="Error on server, Please try again later !!";
          this.display = true;
        }
      });
  } 
  
  downloadFirmLetterUpdateCollegeFees(userid,specialization,id,collegeFees,course_id){
    var file_name = id+'_Final_Letter.pdf';
    if(collegeFees == '0' || collegeFees == ''){
      document.getElementById("coursefeeserror"+id).innerHTML = "Enter valid course fees";
    }else{
      this.adminApi.generateFirmLetter(userid, specialization, id,collegeFees,course_id)
      .subscribe(data => {
        if(data['status'] == 200){
          var myInput = document.getElementById('firmlet'+id);
          myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+userid+'/'+id+'_Final_Letter.pdf');
          // this.adminApi.downloadFirmLetter(userid, file_name)
          // .subscribe(data => {
          //     saveAs(data, file_name);
          // });

        }else{
          this.dialog_Message ="Error on server, Please try again later !!";
          this.display = true;
        }
      });  
    }  

  }

  changeemail(event,id,embassyEmail){
    
    embassyEmail = null;
    document.getElementById("emailerror"+id).innerHTML = null;
    this.embassyEmailList = null;
    
    var embassyEmail=null;
    var permittedValues = this.Countries.map(function (value) {
      if (value.name == event) {
        if(!(value.embassy_email == null) ){
          embassyEmail = value.embassy_email;
        }
        
      }
    });

      if(embassyEmail == null){
        document.getElementById("embassyEmail"+id).style.display = "block";
        document.getElementById("input_email"+id).style.display = "block";
        document.getElementById("sendEmail"+id).style.display = "block";
        document.getElementById("sendEmail1"+id).style.display = "none";
        
      } else {
        let match: string[]; 
        document.getElementById("input_email"+id).style.display = "none";
        document.getElementById("sendEmail"+id).style.display = "none";
        var space = embassyEmail.replace(/\s/g,'');
        var s = space;
        match = s.split(',');
        var message = "Not exists in list";
        match.push(message);
        document.getElementById("embassyEmail"+id).style.display = "block";
        this.embassyEmailList = match;
      }
  }
  
  open(userid,appid,courseid,specialization) {
    this.dialogService.open(PreferencesDialogComponent,{ 
      context: {
        userid : userid,
        appid : appid,
        courseid : courseid,
        specialization : specialization
      }
     }).onClose
        .subscribe(
          (data: any) => {
            this.ngOnInit();
            err => console.error(err)
        });
  }

  iccr_deallocate_College(application_id,user_id,collegename){
      this.confirmationService.confirm({
        message: 'Do you want to perform this action??',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.adminApi.iccr_student_DeallocateCollege(application_id,user_id,collegename).subscribe(data=>{
            if(data['status'] == 200){
              this.index = 1;
              this.tab_type = 'iccr_seat_allocation';
              this.ngOnInit();
            }  else {
              alert("Error on server");
            }
          });
        },
        reject: () => {
            
        }
    });
								
  }

  iccr_provisional_letter_downloadletter(userid,id,course_id){
    var file_name = id+"_Confirmation_provisional_Letter.pdf";
    this.adminApi.ICCR_download_provisional_letter(file_name,userid,id,course_id)
    .subscribe(data => {
      //"/srv/www/code/public/upload/transcript_iccr_student/"+userId+"/"+application_id+"_Confirmation_provisional_Letter.pdf"
      // saveAs(data, file_name);    
      var myInput = document.getElementById('iccrprov'+id);
      myInput.setAttribute('href', config.oldserverUrl+'/upload/transcript_iccr_student/'+userid+'/'+file_name);
    });
    
  }

 

  iccr_open_model(userid,appid,courseid,specialization) {
    this.dialogService.open(ICCRPreferencesDialogComponent,{ 
      context: {
        userid : userid,
        appid : appid,
        courseid : courseid,
        specialization : specialization
      }
    }).onClose
        .subscribe(
          (data: any) => {
            var obj = {
              index: 1
            };
            this.getApplicationAcceptedForeignOffice(obj);
            this.tab_type = 'iccr_seat_allocation';
            this.tab4=true;
            err => console.error(err)
        });
  }

  getThirdPaymentDetails(value,t_paymentMode,amount,currency,transaction_id,dateOfPayment,challanExist,challan){

    this.dialogService.open(ThirdPaymentDetailsDialogComponent,{ 
        context: {
          value : value,
          t_paymentMode : t_paymentMode,
          amount : amount,
          currency : currency,
          transaction_id : transaction_id,
          dateOfPayment : dateOfPayment,
          challanExist: challanExist,
          challan: challan
        }
     }).onClose
        .subscribe(
          (data: any) => {
       
            err => console.error(err)
        });

  }

  ICCR_Download_Firm_Letter(id,user_id){
      
    var file_name = id+"_Final_Letter.pdf";
    this.adminApi.iccrCheckDownloadedFirmLetter(id,user_id,file_name)
    .subscribe(data => {
      if(data['status'] == 200){
        var myInput = document.getElementById('iccrFirm'+id);
        myInput.setAttribute('href', config.oldserverUrl+'/upload/transcript_iccr_student/'+user_id+'/'+file_name);
        // this.adminApi.ICCR_Download_Document(id,user_id,file_name)
        // .subscribe(data => {
        //     saveAs(data, file_name);
        // });  
        
      }else if (data['status'] == 400){
        this.dialog_Message ="College allocation is must before downloading firm letter !!";
        this.display = true;
      }else if (data['status'] == 404){
        this.dialog_Message ="College allocation is must before downloading firm letter !!";
        this.display = true;
      }
       else{
        this.dialog_Message ="Error on server, Please try again later !!";
        this.display = true;
      }     
    });
        
}

  DownloadCertificate(id,course_id,user_id){
    this.adminApi.downloadCertificate(id,course_id,user_id).subscribe (data =>{
      if(data['status'] == 200){
        var name = data['data']['name'];
        var file_name =data['data']['file_name'];
        var file = config.fileUrl+'/public/upload/transcript/'+user_id+'/'+file_name;
        // certi
        var myInput = document.getElementById('certi'+id);
        myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+user_id+'/'+file_name);
        // this.adminApi.downloadFiles(file)
        // .subscribe(data => {
        //   saveAs(data, name+'_'+file_name);    
        // });
      }
    })
  }

  checkverification (value,application_id,user_id){
    var tick_value = ""+value.checked;

    this.adminApi.checkDocumentVerificationValue(tick_value, application_id, user_id)
      .subscribe(data => {
     
        if(data['status'] == 200){
          this.dialog_Message ="Student successfully sent for Firm Letter generation!!!";
          this.display = true;
        }  else  {
          this.dialog_Message ="Error on server, please try again later!!!";
          this.display = true;
        }
      });  
      
  }

}
