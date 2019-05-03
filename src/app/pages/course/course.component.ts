import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  ApiService
} from '../../shared/api.service';
import {
  NbSearchService, NbThemeService
} from '@nebular/theme';
import { HeaderComponent } from '../../@theme/components/header/header.component';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';

@Component({
  selector: 'course',
  styleUrls: ['./course.component.scss'],
  templateUrl: './course.component.html',
  styles: [`
  :host nb-layout-column {
    height: 50vw;
  }
  :host nb-layout-column:first-child {
    background: #f4f4f7;
  }
  :host nb-layout-header /deep/ nav {
    justify-content: flex-end;
  }
`],
providers:[HeaderComponent,ConfirmationService],
})
export class CourseComponent {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private searchService: NbSearchService,
    public themeService : NbThemeService,
    private comp: HeaderComponent,
    private confirmationService: ConfirmationService, ) {

  }
  loading = true;
  loadingbutton = true;
  specialization;
  name;
  courseid;
  courseoverview: any;
  collegelist;
  collegelistCount;
  courselist;
  college_principal;
  college_vice_principal;
  Dropdownvar = 0;
  collegedata;
  status;
  alertflag = 0;
  course_duration;
  colleges;
  procedure;
  process: any = [];
  course_curriculum;
  placement;
  logo;
  Dropdown = 1;
  msgs : Message[]= [];
  async ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.api.searchCollege(data.term, this.route.snapshot.queryParamMap.get('specialization'))
          .subscribe(data => {
              this.colleges = data['data']['college'];
              this.collegelistCount = this.colleges.length;
              this.Dropdown = 2;
            },
            error => {
              console.error("Error", error);
            }

          );
      });
    
    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.api.getCourseCollegeList(this.courseid, this.specialization);
      this.collegelist = response['data']['college_detail'];
      console.log('this.collegelist===='+JSON.stringify(this.collegelist))
      this.logo = response['data']['college_detail']['logo'];
      this.procedure = response['data']['admission_procedure'];
      this.placement = response['data']['course_placements'];
      this.process = this.procedure.slice(1, -1);
      this.course_curriculum = response['data']['course_curriculum'];
      this.course_duration = response['data'].cal_duration;
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }

    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.api.getCollegeList(this.courseid, this.specialization);
      this.colleges = response['data']['college'];
      this.collegelistCount = this.colleges.length;
      this.loading = false;
      this.loadingbutton = false;
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }
  }

  async clearsearch() {
    this.loading = true;
    this.loadingbutton = true;
    try {
      this.courseid = this.route.snapshot.queryParamMap.get('course_id');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      var response = await this.api.getCollegeList(this.courseid, this.specialization);
      this.colleges = response['data']['college'];
      this.collegelistCount = this.colleges.length;
      this.loading = false;
      this.loadingbutton = false;
      this.Dropdown = 1;
    } catch (error) {
      console.error("Error from ngOnInit => " + error);
    }
  }
  onClickMe(x) {
    this.Dropdownvar = x;
  }
  onClose() {
    this.alertflag = 0;

  }

  async courseredirect(id) {
    var getwhishlistresponse = await this.api.getwhishlist(id);
    getwhishlistresponse.subscribe(
      data => {
        this.status = data['status'];
        if (this.status == '300') {
          this.alertflag = 1;
        } else if (this.status == '200') {
          this.alertflag = 0;
          this.router.navigate(['/pages/selectcollege'], {
            queryParams: {
              courseId: id
            }
          })
        }

      },
      error => {
        console.error("Error in wishlist :", error);
      }
    );

  }

  addCart(course_id,degree) {
    this.api.find_intake(this.courseid).subscribe(data => {
      var profileCompleteness = data['data'];
      if(data['status'] == 200){
        if(profileCompleteness == 100){
          this.api.getDegree(this.courseid).subscribe(data =>{
            if(data['status'] ==200){
              this.router.navigate(['pages/selectcollege'],{queryParams:{courseId:course_id}}); 
            }else{
              this.confirmationService.confirm({
                message: 'Please add Degree Marks',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                  this.router.navigate(['pages/profile'],{queryParams:{courseId:course_id,degree:degree}});
                },
                reject: () => {
                  this.ngOnInit();
                }
              });
            }
          })
        }else{
          this.router.navigate(['pages/profile'],{queryParams:{courseId:course_id,degree:degree}});
        }
      }else if(data['status'] ==300){
        this.alertflag = 1;
      
      }else if(data['status'] ==400){
          this.alertflag = 2;
      }
      error => {
          console.error("Error in cart :", error);
      }
    });
    }


  redirectCourse(course_id, specialization) {
    //window.location.reload();
    this.router.navigate(['pages/course'], {
      queryParams: {
        course_id: course_id,
        specialization: specialization,
      }
    }).then(function(){
      window.location.reload();
    });
    //
    
  }
}
