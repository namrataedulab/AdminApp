import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { NbSearchService, NbThemeService } from '@nebular/theme';
import {Location} from '@angular/common';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';

@Component({
  selector: 'preferences',
  styleUrls: ['./preferences.component.scss'],
  templateUrl: './preferences.component.html',
  providers: [ConfirmationService]
})
export class PreferencesComponent  {

  loading = true;
  loadingbutton = true;
  loading1 = true;
  loadingbutton1 = true;
  college_name;
  collegeName;
  preferences_created;
  Dropdown = 1;
  errortext;
  total_pref;
  editFlag = 0;
  flag1 = 0;
  alertFlag = 0;
  count;
  pref_cnt;
  moreColleges = 0;
  buttonName;
  pref1;
  pref2;
  pref3;
  pref4;
  pref5;
  pref6;
  pref7;
  pref8;
  pref9;
  pref10;
  message;
  changeColleges_pref =0;
  msgs : Message[]= [];
  preferences_colleges=[];
  noMoreCollege = 0;

  constructor(private router : Router,
    private route: ActivatedRoute,
    private api : ApiService,
    private searchService : NbSearchService,
    private _location: Location,
     private confirmationService: ConfirmationService,
     public themeService : NbThemeService) {
   
  }

  async ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.flag1 = 0;
    this.alertFlag = 0;
    this.moreColleges = 0;
    this.changeColleges_pref = 0;
    this.editFlag = 0;

    try {
      var response = await this.api.viewPreferences(this.route.snapshot.queryParamMap.get('courseId'));
      response.subscribe(
        data => {
            this.college_name =  data['data']['colleges'];
            this.total_pref = data['data'].total_pref;
            this.preferences_created =  data['data']['preferences_created'];
            this.loading = false;
            this.loadingbutton = false;
            this.preferences_colleges= [];
            if(this.preferences_created.pref1){
              this.preferences_colleges.push(this.preferences_created.pref1);
            }
            if(this.preferences_created.pref2){
              this.preferences_colleges.push(this.preferences_created.pref2);
            }
            if(this.preferences_created.pref3){
              this.preferences_colleges.push(this.preferences_created.pref3);
            }
            if(this.preferences_created.pref4){
              this.preferences_colleges.push(this.preferences_created.pref4);
            }
            if(this.preferences_created.pref5){
              this.preferences_colleges.push(this.preferences_created.pref5);
            }
            if(this.preferences_created.pref6){
              this.preferences_colleges.push(this.preferences_created.pref6);
            }
            if(this.preferences_created.pref7){
              this.preferences_colleges.push(this.preferences_created.pref7);
            }
            if(this.preferences_created.pref8){
              this.preferences_colleges.push(this.preferences_created.pref8);
            }
            if(this.preferences_created.pref9){
              this.preferences_colleges.push(this.preferences_created.pref9);
            }
            if(this.preferences_created.pref10){
              this.preferences_colleges.push(this.preferences_created.pref10);
            }
            this.count = this.preferences_colleges.length;
          },
        error => {  
            console.error("Error", error);
        }
    );  
 
    } catch (error) {
    }
    this.searchService.onSearchSubmit()
    .subscribe( (data: any) => {
     this.loading = true;
     this.loadingbutton = true;
     this.api.searchPreferences(data.term,this.route.snapshot.queryParamMap.get('courseId'))
     .subscribe(data => {
       this.loading = false;
       this.loadingbutton = false;
       this.college_name = data['colleges'];
       this.Dropdown = 2;
     },

     error => {
       console.error("Error", error);
     }
       
       );
   });
   
 }

 async getMoreColleges(){
   try{
      this.flag1 = 1;
      this.moreColleges = 1;
      this.loading1 = true;
      this.loadingbutton1 = true;
      this.buttonName = "Add Preferences";
      var response = await this.api.getMoreColleges(this.route.snapshot.queryParamMap.get('courseId'));
    response.subscribe(
      data => {
          this.college_name =  data['data'];
          this.preferences_created = this.college_name[0].pref;
          this.loading1 = false;
          this.loadingbutton1 = false;
        },
      error => {  
          console.error("Error", error);
      }
  );  

  } catch (error) {
  }
 }

 OptionsSelected (event: any){
	if(event.target.checked == true){
    if(this.count >= 10){
      this.alertFlag = 1;
      event.target.checked =false;
    }else{
        if(this.preferences_created.pref1 == '' || this.preferences_created.pref1 == undefined){
          this.preferences_created.pref1 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref2 == '' || this.preferences_created.pref2 == undefined){
          this.preferences_created.pref2 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref3 == '' || this.preferences_created.pref3 == undefined){
          this.preferences_created.pref3= event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref4 == '' || this.preferences_created.pref4 == undefined){
          this.preferences_created.pref4 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref5 == '' || this.preferences_created.pref5 == undefined){
          this.preferences_created.pref5 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref6 == '' || this.preferences_created.pref6 == undefined){
          this.preferences_created.pref6 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref7 == '' || this.preferences_created.pref7 == undefined){
          this.preferences_created.pref7 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref8 == '' || this.preferences_created.pref8 == undefined){
          this.preferences_created.pref8 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref9 == '' || this.preferences_created.pref9 == undefined){
          this.preferences_created.pref9 = event.target.value;
          this.count += 1;
        }else if(this.preferences_created.pref10 == '' || this.preferences_created.pref10 == undefined){
          this.preferences_created.pref10 = event.target.value;
          this.count += 1;
        }
      }
  }else{
    this.alertFlag = 0;
    if(this.preferences_created.pref1 == event.target.value){
      this.preferences_created.pref1 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref2 == event.target.value){
      this.preferences_created.pref2 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref3 == event.target.value){
      this.preferences_created.pref3 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref4 == event.target.value){
      this.preferences_created.pref4 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref5 == event.target.value){
      this.preferences_created.pref5 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref6 == event.target.value){
      this.preferences_created.pref6 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref7 == event.target.value){
      this.preferences_created.pref7 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref8 == event.target.value){
      this.preferences_created.pref8 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref9 == event.target.value){
      this.preferences_created.pref9 = '';
      this.count -= 1;
    }else if(this.preferences_created.pref10 == event.target.value){
      this.preferences_created.pref10 = '';
      this.count -= 1;
    }
  }
}

onClose(){
  this.alertFlag = 0;
}

onCloseChage(){
  this.noMoreCollege = 0;
  this.changeColleges_pref = 0;
}

async add_preferences(){
  if(this.buttonName == "Add Preferences"){
    try{
      var response = await this.api.addMorePref(this.preferences_created);
      response.subscribe(
        data => {
          this.ngOnInit();
          this.changeColleges_pref = 0;
          this.preferences_colleges= [];
        },
        error => {  
          console.error("Error", error);
        }
      );  
    } catch (error) {
    }
  }else if(this.buttonName == "Save"){
    try{
      var response = await this.api.changePreference(this.pref_cnt,this.preferences_created.course_id,this.collegeName);
      response.subscribe(
        data => {
          this.changeColleges_pref = 0;
          this.preferences_colleges= [];
          this.ngOnInit();
        },
        error => {  
          console.error("Error", error);
        }
      );  
    } catch (error) {
    }
  }
}





 backClicked() {
  this._location.back();
}


drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.preferences_colleges, event.previousIndex, event.currentIndex);

  if(event.item.moved){
      this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          
          var i=1;

          this.preferences_colleges.forEach(pref =>{
          this["pref" + i] = pref;
          i++;
          })

          try {
          this.api.updatePreferences(this.route.snapshot.queryParamMap.get('courseId'), this.pref1, this.pref2, this.pref3, this.pref4, this.pref5, this.pref6, this.pref7, this.pref8, this.pref9, this.pref10).subscribe(
              data => {
              this.preferences_colleges=[];
              this.ngOnInit();
              },
              error => {
              console.log("Error", error);
              }
          );
      
          } catch (error) {
          console.log("Error", error);
          }


      },
  reject: () => {
      this.preferences_colleges=[];
      this.ngOnInit();
  }
    
});

} 

}

async change_pref(i){
  
  try{
    this.flag1 = 1;
    this.changeColleges_pref = 1;
    this.buttonName = "Save";
    this.loading1 = true;
    this.loadingbutton1 = true;
    this.pref_cnt = i+1;
    var response = await this.api.getMoreColleges(this.route.snapshot.queryParamMap.get('courseId'));
    response.subscribe(
      data => {
        if(data['status'] == 200){
          this.college_name =  data['data'];
          this.preferences_created = this.college_name[0].pref;
        }else{
          this.message = data['message'];
          this.noMoreCollege = 1;
        }
          this.loading1 = false;
          this.loadingbutton1 = false;
        },
      error => {  
          console.error("Error", error);
      }
  );  
  
  } catch (error) {
  }
  
  }
  

}