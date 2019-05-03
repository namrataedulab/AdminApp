import { Component, ViewChild, HostListener } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { FormGroup } from '@angular/forms';
import { NbDateService, NbStepperComponent, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.scss'],
  providers:[HeaderComponent],
})
export class DashboardComponent {
  @HostListener('window:resize', ['$event'])
  @ViewChild('stepper') stepper : NbStepperComponent;

  screenHeight:any;
  screenWidth:any;
  cartValue;
  cartCheck = false;
  applicationCheck = false;
  application;
  applicationData;
  applicationID;
  min: Date;
  max: Date;
  alertFlag = 0;
  selectedItem ;
  user = { name : "",id:"",role:""};
  firstForm: FormGroup;
  courseID;
  length;
  message;
  status = false;
  pincode;
  colleges;
  alert: number =0;
  ucaFlag = false;

  constructor(private userService: UserService,
    protected dateService: NbDateService<Date>,
    protected api : ApiService,
    protected router : Router,
    public themeService : NbThemeService,
    private comp: HeaderComponent,
    private authService : NbAuthService
  ) {
      this.min = this.dateService.addMonth(this.dateService.today(), -1);
      this.max = this.dateService.addMonth(this.dateService.today(), 1);
      this.getScreenSize();
      
    }
  
  async ngOnInit() {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
        if(token.getPayload()['role'] == "admin" || token.getPayload()['role'] == "sub_admin"){
          this.router.navigate(['auth/adminOtp'])
        }else if(token.getPayload()['role'] == "institute"){
          this.router.navigate(['pages/InstituteDashboard'])
        }
    });
    this.api.getTheme().subscribe((data: any) => {
      if(data['data']){
        this.themeService.changeTheme(data['data']);
      }else{
        this.themeService.changeTheme('default');
      }
    });

  
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      if(this.user.role == 'student'){
        var cart = await this.api.getCartValue();
        this.cartValue = cart['data']['course'];
        if(this.cartValue.length > 0){
          this.cartCheck = true;  
          setTimeout(() => {
            this.setOrientation();
            this.stepper.selectedIndex = 0;
          },1000);
        }else{
          this.cartCheck = false;
        }
        var applications = await  this.api.getApplicationLength();
        applications.subscribe(data =>{
          this.application = data['data'];
          this.length = data['length'];
          if(this.length == 1){
            this.ucaFlag = true;
        
          this.applicationID = this.application.id;
          this.courseID = this.application.course_id;
          if(this.application.provisional_letter_exists == true){
            setTimeout(() => {
              this.setOrientation();
              this.stepper.selectedIndex = 2;
            },1000);
          }
          if(this.application.visa_document_exists == true){
            setTimeout(() => {
              this.setOrientation();
              this.stepper.selectedIndex = 3;
            },1000);
          }
          if(this.application.collegeName){
            setTimeout(() => {
              this.setOrientation();
              this.stepper.selectedIndex = 4;
            },1000);
          }
          if(this.application.final_letter_exists == true){
            setTimeout(() => {
              this.setOrientation();
              this.stepper.selectedIndex = 5;
            },1000);
          }
          }else if(this.length > 1 ){
          this.ucaFlag = true;
          
          this.applicationData = data['data'];
          setTimeout(() => {
            this.setOrientation();
            this.stepper.selectedIndex = 1;
          },1000);
          this.applicationData.forEach(element => {
            if(element.status == "accept"){
              this.status = true;
            }
          });
          }

        }); 
      }
     
  } 


  setOrientation(){
    if(this.screenWidth < 500){
      this.stepper.orientation = "vertical";
    }else{
      this.stepper.orientation = "horizontal";
    }
  }

  setCourse_id(course_id){
  this.courseID = course_id;
  }

  async setStepper(id){
    this.stepper.reset();
    this.applicationID = id;   
    var app = await  this.api.getUserApplication(id);
    app.subscribe(data =>{
      this.application= data['data'];
      if(this.length > 0){
        this.stepper.selectedIndex = 1;
      }
      if(this.application.provisional_letter_exists == true){
        this.stepper.selectedIndex = 2;
      }
      if(this.application.visa_document_exists == true){
        this.stepper.selectedIndex = 3;
      }
      if(this.application.collegeName){
        this.stepper.selectedIndex = 4;
      }
      if(this.application.final_letter_exists == true){
        this.stepper.selectedIndex = 5;
      }
    });
  }


  selectStep(){
    if(this.stepper.selectedIndex == 0){
      if(this.cartCheck == true){
        this.router.navigate(['pages/cart']);
      }else{
        this.message = "You have not add any course to cart, for adding search your desired course then add to cart.";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 1){
      if(this.length > 0){
        this.router.navigate(['pages/application']);
      }else{
        this.message = "You havn't apply any course";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 2){
      if(this.application.provisional_letter_exists == true){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:0}});
      }else{
        this.message = "Provisional Letter is not genearated yet";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 3 ){
      if(this.application.visa_document_exists == true){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:2}});
      }else{
        this.message = "Upload Required Document";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 4){
      if(this.application.collegeName){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:3}});
      }else{
        this.message = "College is not assigned yet";
        this.alertFlag = 1;
        this.timer();
      }
    }else if(this.stepper.selectedIndex == 5){
      if(this.application.final_letter_exists == true){
        this.router.navigate(['pages/application/process'],{queryParams:{appId :this.applicationID,courseID:this.courseID,selectedIndex:4}});
      }else{
        this.message = "Final letter is not generated yet";
        this.alertFlag = 1;
        this.timer();
      }
    }
  }

  onClose(){
    this.alertFlag = 0;
  }

  timer (){
    setTimeout(()=>{
      //this.onClose();
      this.alertFlag = 0;
    },5000);
  }
  
  searchCollege(){
    if(!(this.pincode===undefined || this.pincode === '' )){
      this.router.navigate(['pages/search'],{queryParams:{postal_code:this.pincode}});
    }
    else{
      this.alert=1
    }
    
  }



  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}
