import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { NbSearchService, NbThemeService } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'searchCourse',
  styleUrls: ['./searchCourse.component.scss'],
  templateUrl: './searchCourse.component.html',
})
export class searchCourseComponent  {
  myControl = new FormControl();
  p: number = 1;
coursename;
specialization;
courseCount;
courses;
Dropdown=1;
loading = true;
loadingbutton = true;
public filterText: string;
public filterPlaceholder: string;
public filterInput = new FormControl();

  constructor(private router : Router,
    private route: ActivatedRoute,
    protected api : ApiService,
    public themeService : NbThemeService,
    private _location: Location,) {

  }
  ngOnInit(){
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.coursename = this.route.snapshot.queryParamMap.get('coursename');
    this.specialization = this.route.snapshot.queryParamMap.get('specialization');



    try {
      this.filterText = "";
      this.filterPlaceholder = "Filter by College Name";
      this.coursename = this.route.snapshot.queryParamMap.get('coursename');
      this.specialization = this.route.snapshot.queryParamMap.get('specialization');
      this.api.QuickSearch(this.coursename,this.specialization).subscribe(data => { 
        this.courses = data['data'];
        this.courseCount = this.courses.length;
        this.loading = false;
      this.loadingbutton = false;
      this.Dropdown = 2;
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
        this.filterText = term;
      });
      });
    }catch (error) {
      console.error("Error from ngOnInit => "+error);
    }
  }

  CourseList(course_id,specialization){
    this.router.navigate(['pages/course'],{queryParams:{course_id:course_id,specialization:specialization}});
 }

 Back(){
  this._location.back();
}



}

