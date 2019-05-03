import {Component} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {Location} from '@angular/common';
import { saveAs } from 'file-saver';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { config } from '../../../../config';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class AdminViewComponent {
  studentData;
  userTranscripts;
  category;
  userId;
  courseId;
  applicationId;
  serverUrl: string;
  fileUrl: string;
  constructor(protected adminApi : AdminApiService,
    private route: ActivatedRoute,
    private _location: Location,
    private authService : NbAuthService,
    private router : Router,
    ) { 
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
          this.router.navigate(['auth/logout'])
        }
      });
  }

  async ngOnInit(){
    this.serverUrl = config.serverUrl;
    this.fileUrl = config.fileUrl;
  try {
    this.category=this.route.snapshot.queryParamMap.get('category');
    console.log('this.category====>'+this.category);
    this.userId=this.route.snapshot.queryParamMap.get('userId');
    this.courseId=this.route.snapshot.queryParamMap.get('courseId');
    this.applicationId=this.route.snapshot.queryParamMap.get('applicationId');
    var tab = this.route.snapshot.queryParamMap.get('tab');
    if(this.category==="application" || this.category==="eligibility"){
      var viewAllData = await this.adminApi.getAllUserData(this.userId,this.courseId,this.applicationId,tab);
      this.studentData =  viewAllData['data'];
      this.userTranscripts = viewAllData['data']['userTranscripts'];
    }else if(this.category==="studentmgmt"){      
      var viewAllData = await this.adminApi.getAllStudentData(this.userId);
      this.studentData =  viewAllData['data'];
      this.userTranscripts = viewAllData['data']['userTranscripts'];
    }else if( this.category==="iccr"){      
      var viewAllData = await this.adminApi.getAllIccrStudentData(this.userId,this.courseId,this.applicationId,tab);
      this.studentData =  viewAllData['data'];
      this.userTranscripts = viewAllData['data']['userTranscripts'];
    }

    } catch (error) {
      console.log("Error", error);
    }

}

preview(category){
 
    this.adminApi.preview(this.userId,this.courseId,this.applicationId).subscribe(data => {
      if(data[`status`] == 200){
        // this.adminApi.downloadFiles(data[`data`])
        // .subscribe(data => {
        //   saveAs(data, this.applicationId+'_Preview.pdf');    
        // });
        var myInput = document.getElementById('letterPrev');
        myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+this.userId+'/'+this.applicationId+'_Preview.pdf');
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })

}

DownloadTranscript(file_path,name){
  this.adminApi.downloadFiles(file_path)
  .subscribe(data => {
    saveAs(data, name);    
  });
}

Back(){
  this._location.back();
}
}
