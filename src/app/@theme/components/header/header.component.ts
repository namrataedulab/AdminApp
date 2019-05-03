import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../../shared/socket.service';
import { ApiService } from '../../../shared/api.service';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user = {
    id: "",
    email:"",
    role:""
  };
  notification;
  notification_no: any;
  deleteShow :any;

  private alive: boolean; // used to unsubscribe from the IntervalObservable
                          // when OnDestroy is called.
   adminsocket: any;

  userMenu = [
    { title: 'Profile', icon: 'fa fa-user', link: '/pages/profile' },
    { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
    { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

  adminMenu = [    
    { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
    { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

  instituteMenu = [
    { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
    { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              public http: HttpClient,
              private socket : SocketService,
              protected api: ApiService,
              private router : Router,
              private mainsocket: Socket,) {
                this.userService.onUserChange()
                .subscribe((user: any) => this.user = user);
                //this.api.notification(this.user.id);
                this.userService.onUserChange()
                .subscribe((user: any) => this.user = user);
                if(this.user.role === 'student'){
                  this.api.notification(this.user.id,'student');
                }else if(this.user.role === 'admin'){
                  this.api.notification(this.user.id,'admin');
                }

  }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      if(this.user.role == 'student'){
        this.api.socketNotificationNo.subscribe(nn =>{
          if(nn==""){
            //do nothing
          }else{
            this.notification_no = nn;
          }
        });
  
        this.api.socketmessage.subscribe(notification_data =>{
          if(notification_data==""){
            this.deleteShow = false;
            this.notification = notification_data;
          }else{
            this.deleteShow = true;
            this.notification = notification_data;
          }
        });
      //   //var socket = io.connect('https://localhost', {secure: true});
      //   this.adminsocket = io.connect("https://mu.admissiondesk.org", {
      //       reconnection: true,transports: ['websocket'],secure: true
      //   });
      // // console.log("Between socket : "+this.adminsocket);
        this.mainsocket.on('connect', function () {
         console.log('connected to muadmin.admissiondesk.org'); 
        });
      //   //console.log("user.email========>"+this.user.email);
        this.mainsocket.emit('confirmation');
        this.mainsocket.emit('join', {email: this.user.email});
    
        this.mainsocket.on('person', function(person){  
        //  console.log(person.name, 'is', person.age, 'years old.');
        });
    
        this.mainsocket.on('goodbye', function(){  
        // console.log('goodbye goodbye goodbye goodbye goodbye');
        });
        
        this.mainsocket.on('new_msg', (data) => {
        // console.log("data.msg NEW----->"+data);
          this.ReloadNotification('student');
        });

      }else if(this.user.role == 'admin'){
        this.api.socketNotificationNo.subscribe(nn =>{
          if(nn==""){
            //do nothing
          }else{
            this.notification_no = nn;
          }
        });
  
        this.api.socketmessage.subscribe(notification_data =>{
          if(notification_data==""){
            this.deleteShow = false;
            this.notification = notification_data;
          }else{
            this.deleteShow = true;
            this.notification = notification_data;
          }
        });
        this.mainsocket.on('sp',(data) =>{
          this.ReloadNotification('admin');
        });
      }
     
  }

  help(){
    this.router.navigate(['pages/help'])
  }

  notify(type){
    console.log("notify");
    if(this.notification_no > 0){
      //console.log("this.notification_no > 0 ");
      this.api.makeReadNotification(this.user.id,type)
      .subscribe(
        (data: any) => {
          //console.log("Upadted data==========>");
          this.notification_no = '';
        },
        error => {
          console.error("Error", error);
        });
    }
  }

  deleteNotification(id,type){
   // console.log("id============>"+id);
    this.api.deleteNotification(this.user.id,id,type)
      .subscribe(
        (data: any) => {
         // console.log("Delete data==========>");
          //this.ReloadNotification(type);
          window.location.reload();
        },
        error => {
          console.error("Error", error);
        });
  }

  ReloadNotification(type){
    this.notification=[];
    this.api.reloadnotification(this.user.id,type)
      .subscribe(
        (data: any) => {
          if(data['data'].length == 0){
            this.deleteShow = false;
            this.notification_no = '';
          }else if(data['data'].length > 0){
            this.deleteShow = true;
            if(data['notification_no'] == 0){
              this.notification_no = '';
            }else{
              this.notification_no = data['notification_no'];
            }
            for(let notify of data['data']) {
              this.notification.push(notify);
            }
          }
        },
        error => {
          console.error("Error", error);
        });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {

    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    if(this.user.role==="student" || this.user.role==='student'){
      this.menuService.navigateHome();
    }else if(this.user.role==="admin"){
      this.router.navigate(['pages/adminDashboard'])
    }
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
