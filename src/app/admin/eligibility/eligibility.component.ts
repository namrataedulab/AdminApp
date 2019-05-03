import {Component ,OnInit,ElementRef, ViewChild} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { config } from '../../../../config';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
  providers:[ConfirmationService],
})

export class AdminEligibilityComponent {
  @ViewChild('myDiv') myDiv: ElementRef;
  tab_type;
  application_data;
  p: number = 1;
  status;
  selectedYear ='2019'
  msgs : Message[]= [];
  loading=false;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  serverUrl: string;
  oldserverUrl: string;
  constructor(protected adminApi : AdminApiService,
    private router : Router,
    private confirmationService: ConfirmationService,
    private authService : NbAuthService) { 
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
      if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
        this.router.navigate(['auth/logout'])
      }
    });
  }

  ngOnInit(){
    this.serverUrl = config.serverUrl;
    this.oldserverUrl = config.oldserverUrl;
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
  }
  DownloadApplicationLetter(userId,courseId,applicationId){
    this.adminApi.preview(userId,courseId,applicationId).subscribe(data => {
      if(data[`status`] == 200){
        // this.adminApi.downloadFiles(data[`data`])
        // .subscribe(data => {
        //   saveAs(data, applicationId+'_Preview.pdf');    
        // });
        var myInput = document.getElementById('prevLet'+applicationId);
        myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+userId+'/'+applicationId+'_Preview.pdf');
      }else{
        alert("You Can't Download Preview Letter!!!!!!");
      }
  
    })
  }
  filterYear(year){
    this.adminApi.getApplicationinEligibility('new',year).subscribe(data=>{
      this.application_data = data['data'];
    })
    this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  filterYearReUpload(year){
    this.adminApi.getrequested_unlocked_transcript(year).subscribe(data=>{
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

  filterApplication(tab_type,year){
    this.adminApi.getApplication(tab_type,year).subscribe(data=>{
      this.application_data = data['data'];
    })
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }
  getApplication(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'new'
    }else if(index == 1){
      this.tab_type = 'accept'
    }else if(index == 2){
      this.tab_type = 'reject'
    }else if(index == 3){
      this.tab_type = 'requested_unlocked_transcript'
    }else if(index == 4){
      this.tab_type = 'iccr'
    }else if(index == 5){
      this.tab_type = 'iccr_allocated_college_data'
    }else if(index == 6){
      this.tab_type = 'iccr_requested_unlocked_transcript'
    }
    if(this.tab_type == 'new'){
      this.adminApi.getApplicationinEligibility(this.tab_type,this.selectedYear).subscribe(data=>{
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
    }else if(this.tab_type == 'iccr'){
      this.status='new';
      this.adminApi.getICCRApplicationinEligibility(this.selectedYear,this.status).subscribe(data=>{
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
    }else if(this.tab_type == 'iccr_allocated_college_data'){
      this.adminApi.geticcr_allocated_college_data(this.selectedYear).subscribe(data=>{
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
    }else if(this.tab_type == 'requested_unlocked_transcript'){
      this.adminApi.getrequested_unlocked_transcript(this.selectedYear).subscribe(data=>{
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
    }else if(this.tab_type == 'iccr_requested_unlocked_transcript'){
      this.adminApi.geticcr_requested_unlocked_transcript(this.selectedYear).subscribe(data=>{
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
    }else if(this.tab_type ==='accept' ||  this.tab_type === 'reject'){
      this.adminApi.getApplication(this.tab_type,this.selectedYear).subscribe(data=>{
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

  filterYearICCR(tab_type,year){
    if(tab_type='iccr'){
      this.status='new';
      this.adminApi.getICCRApplicationinEligibility(year,this.status).subscribe(data=>{
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

    }else if(tab_type='iccr_allocated_college_data'){
      this.adminApi.geticcr_allocated_college_data(year).subscribe(data=>{
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
    }else if(tab_type='iccr_requested_unlocked_transcript'){
      this.adminApi.geticcr_requested_unlocked_transcript(year).subscribe(data=>{
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

  showprovisionalLetterApp(user_id,course_id,application_id){
    // this.adminApi.showprovisionalLetterApp(user_id,course_id,application_id).subscribe(data => {
    //   if(data[`status`] == 200){
    var pdf = config.fileUrl+'/public/upload/transcript/'+user_id+'/'+application_id+'_Confirmation_provisional_Letter.pdf'
    this.adminApi.downloadFiles(pdf)
    .subscribe(data => {
      saveAs(data, application_id+'_Confirmation_provisional_Letter.pdf');    
    });
       
    //   }else{
    //     alert("You Can't Download Preview Letter!!!!!!")
    //   }
  
    // })
  }

  preview(user_id,course_id,application_id){
    this.adminApi.preview(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        // this.adminApi.downloadFiles(data[`data`])
        // .subscribe(data => {
        //   saveAs(data, application_id+'_Preview.pdf');    
        // });
        var myInput = document.getElementById('prevLetter'+application_id);
        myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+user_id+'/'+application_id+'_Preview.pdf');
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  
  }

  preview_data_with_Preferences(user_id,course_id,application_id){
    this.adminApi.preview_data_with_Preferences(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        // this.adminApi.downloadFiles(data[`data`])
        // .subscribe(data => {
        //   saveAs(data, application_id+'_Preview_Pref.pdf');    
        // });
        var myInput = document.getElementById('prevLetPref'+application_id);
		    myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+user_id+'/'+application_id+'_Preview_Pref.pdf');
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }

  DownloadProvisionalLetter(user_id,id){
    this.adminApi.DownloadProvisionalLetter(user_id,id).subscribe(data => {
      if(data['status'] == 200){
        var pdf = config.fileUrl+'/public/upload/transcript/'+user_id+'/'+id+'_Confirmation_provisional_Letter.pdf'
        this.adminApi.downloadFiles(pdf)
        .subscribe(data => {
        saveAs(data, id+'_Confirmation_provisional_Letter.pdf');    
        });
      }else if(data['status'] == 400){
        alert('Confirmation Provisional Letter Not generated !!')
      }
    })
    
  }

  DownloadICCRProvisionalLetter(user_id,id){
    var pdf = '/srv/www/code/public/upload/transcript_iccr_student/'+user_id+'/'+id+'_Confirmation_provisional_Letter.pdf'
    this.adminApi.downloadFiles(pdf)
    .subscribe(data => {
    saveAs(data, id+'_Confirmation_provisional_Letter.pdf'); 
       
    });
  }

  viewMore(category,userId,courseId,tab,applicationId){
    this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
  }

  downloadForewordLetter(pdf,file_name){
    this.adminApi.downloadFiles(pdf)
    .subscribe(data => {
     saveAs(data, file_name);    
    });
  }

  downloadICCRForewordLetter(pdf,file_name){
    this.adminApi.downloadFiles(pdf)
    .subscribe(data => {
     saveAs(data, file_name);    
    });
  }

  errata(userId,category){
    this.router.navigate(['pages/adminErrata'],{queryParams:{userId : userId ,category:category}});
  }

  acceptApplication(userId,courseId,id){
    this.loading=true;
    var eligib_number = ((document.getElementById("eligib_number"+id) as HTMLInputElement).value);
    var eligib_remark = ((document.getElementById("eligib_remark"+id) as HTMLInputElement).value);
    if(eligib_number==null || eligib_number==undefined || eligib_number==""||eligib_number==" " && 
    eligib_remark==null || eligib_remark==undefined || eligib_remark==""||eligib_remark==" " ){
      document.getElementById("elignumbererror"+id).innerHTML ="Eligblity number is required";
      document.getElementById("elignumbererror"+id).style.color = "red";
      document.getElementById("eligremarkerror"+id).innerHTML ="Remarks is required";
			document.getElementById("eligremarkerror"+id).style.color = "red";
    }else{
      document.getElementById("elignumbererror"+id).innerHTML ="";
      document.getElementById("eligremarkerror"+id).innerHTML ="";
      this.adminApi.acceptApplication(userId,courseId,eligib_number,eligib_remark).subscribe(data=>{
        if(data['status'] == 200){
          this.loading=false;
          document.getElementById('view_eligibility'+id).style.visibility = "hidden";
          document.getElementById('documentverify'+id).style.visibility = "hidden";
          document.getElementById('acceptbutton'+id).style.visibility = "hidden";
          document.getElementById('rejectbutton'+id).style.visibility = "hidden";
          this.confirmationService.confirm({
            message: 'Application Accepted!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
        
      })
    }
  }

  rejectApplication(userId,courseId,id){
    this.loading=true;
    this.adminApi.rejectApplication(userId,courseId).subscribe(data=>{
      if(data['status'] == 200){
        this.loading=false;
        document.getElementById('view_eligibility'+id).style.visibility = "hidden";
        document.getElementById('documentverify'+id).style.visibility = "hidden";
        document.getElementById('acceptbutton'+id).style.visibility = "hidden";
        document.getElementById('rejectbutton'+id).style.visibility = "hidden";
        
        this.confirmationService.confirm({
          message: 'Application Rejected!!!',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            
          }
        });
      }
      
    })
  }

  acceptApplicationICCR(userId,courseId,id){
    this.loading=true;
    var eligib_numbericcr = ((document.getElementById("eligib_numbericcr"+id) as HTMLInputElement).value);
    var eligib_remarkiccr = ((document.getElementById("eligib_remarkiccr"+id) as HTMLInputElement).value);
    if(eligib_numbericcr==null || eligib_numbericcr==undefined || eligib_numbericcr==""||eligib_numbericcr==" " && 
      eligib_remarkiccr==null || eligib_remarkiccr==undefined || eligib_remarkiccr==""||eligib_remarkiccr==" "){
      document.getElementById("elignumber_iccrerror"+id).innerHTML ="Eligblity number is required";
      document.getElementById("elignumber_iccrerror"+id).style.color = "red";
      document.getElementById("eligremarkiccrerror"+id).innerHTML ="Remarks is required";
			document.getElementById("eligremarkiccrerror"+id).style.color = "red";
    }else{
      document.getElementById("elignumber_iccrerror"+id).innerHTML ="";
      document.getElementById("eligremarkiccrerror"+id).innerHTML ="";
      this.adminApi.acceptApplicationICCR(id,userId,courseId,eligib_numbericcr,eligib_remarkiccr).subscribe(data=>{
        if(data['status'] == 200){
          this.loading=false;
          document.getElementById('view_eligibilityiccr'+id).style.visibility = "hidden";
          document.getElementById('documentverifyiccr'+id).style.visibility = "hidden";
          document.getElementById('acceptbuttoniccr'+id).style.visibility = "hidden";
          document.getElementById('rejectbuttoniccr'+id).style.visibility = "hidden";
          this.confirmationService.confirm({
            message: 'Application Accepted!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
        
      })
    }
  }

  rejectApplicationICCR(userId,courseId,id){
    this.loading=true;
    this.adminApi.rejectApplicationICCR(userId,courseId).subscribe(data=>{
      if(data['status'] == 200){
        this.loading=false;
        document.getElementById('view_eligibilityiccr'+id).style.visibility = "hidden";
        document.getElementById('documentverifyiccr'+id).style.visibility = "hidden";
        document.getElementById('acceptbuttoniccr'+id).style.visibility = "hidden";
        document.getElementById('rejectbuttoniccr'+id).style.visibility = "hidden";
        this.confirmationService.confirm({
          message: 'Application Rejected!!!',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            
          }
        });
      }
      
    })
  }

  view_reupload_transcript(userId,category){
    this.router.navigate(['pages/AdminReuploadedTranscript'],{queryParams:{userId : userId,category:category}});
  }

  DownloadFirmPDFICCR(applicationId,userId){
    this.adminApi.DownloadFirmPDFICCR(applicationId,userId).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, applicationId+'_Final_Letter.pdf');    
        });
      }else{
        alert("You can't download firm letter until you allocate any college.")
      }
    })

  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email}});
  }

}
