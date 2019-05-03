import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService,NbThemeService } from '@nebular/theme';
import {  Router, RouterLink } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  

  constructor(private analytics: AnalyticsService, 
    private menuService: NbMenuService,
    private api: ApiService,
    private themeService : NbThemeService,
    private router : Router) {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
  }

  onContecxtItemSelection(title) {
    console.log("menu "+ title);
    if(title == 'Light'){
      this.themeService.changeTheme('default'); 
      this.api.setTheme('default')
      .subscribe(data => {
       });
    }
    if(title == 'Cosmic'){
      this.themeService.changeTheme('cosmic');
      this.api.setTheme('cosmic')
      .subscribe(data => {
       });
    }
    if(title == 'Corporate'){
      this.themeService.changeTheme('corporate');
      this.api.setTheme('corporate')
      .subscribe(data => {
       });
    }

    if(title == 'FAQ'){
      
     // window.location.href = 'http://mu.admissiondesk.org/faq.html';

      window.open(
        'http://mu.admissiondesk.org/faq.html',
        '_blank'
      );
    }
 
    // if ( title === 'Logout' ) {
    //   const response = confirm('Are you sure you want to logout?');
    //   if ( response ) {
    //     this.router.navigate(['auth/login']);
    //   }
    // }
  } 

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
