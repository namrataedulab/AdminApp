import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InstituteApiService } from '../../shared/instituteapi.service';
@Component({
  selector: 'ngx-institute-dashboard',
  templateUrl: './institute-dashboard.component.html',
  styleUrls: ['./institute-dashboard.component.scss']
})
export class InstituteDashboardComponent implements OnInit {
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  coursedata: any;
  p:number=1;
  constructor(
    private instituteApi :InstituteApiService,
  ) {
    
   }

  async ngOnInit() {
    this.filterText = "";
    this.filterPlaceholder = "Search";
    var applications = await  this.instituteApi.getDashboardData();
    
      applications.subscribe(data =>{
        this.coursedata = data['data']['courses'];
      });

        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
  }

}
