import { Component } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import {Location} from '@angular/common';
import { SupportapiService } from '../../../shared/supportapi.service';
import { ApiService } from '../../../shared/api.service';
import {Data} from '../../../shared/data';
//import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'viewTicket',
    styleUrls: ['./viewTicket.component.scss'],
    templateUrl: './viewTicket.component.html',
})

export class ViewTicketComponent{
    ticketData;
    comments;
    today;
    comment="";
    user = {email :"",name:"",role:""};
    ticketStatus;
    status = [{name:"New", value:0},{name:"Open", value:1},{name:"Pending", value:2},{name:"Closed", value:3}];
    constructor(private toastrService: NbToastrService,
        private router: Router,
        private route : ActivatedRoute,
        private userService: UserService,
        private supportapi : SupportapiService,
        private _location: Location,
        private api : ApiService,
        private globalVar : Data,
        public themeService : NbThemeService){

        }
    
    ngOnInit(){
        this.api.getTheme().subscribe((data: any) => {
            if(data['data']){
              this.themeService.changeTheme(data['data']);
            }else{
              this.themeService.changeTheme('default');
            }
          });
        this.userService.onUserChange()
        .subscribe((user: any) => {this.user = user
          if(this.user.role==='student'){
            var response =  this.supportapi.getSingleTicket(uid);
            response.subscribe(
                data => {
                    this.ticketData = data['data'];   
                    this.ticketStatus = this.ticketData.status;                
                    this.comments = this.ticketData['comments'];                           
                },
                error => {
                    console.error("ngOnInit get Single Ticket : ", error);
                }
          );

          }
        });
        this.comment="";
        var uid = this.route.snapshot.queryParamMap.get('ticket_uid');
        this.today = new Date().toUTCString();        
        var response =  this.supportapi.getSingleTicket(uid);
        response.subscribe(
            data => {
                this.ticketData = data['data'];   
                this.ticketStatus = this.ticketData.status;                
                this.comments = this.ticketData['comments'];                           
            },
            error => {
                console.error("ngOnInit get Single Ticket : ", error);
            }
        );
    }

    // backClicked(){
    //     this._location.back();
    // }

    backClicked(){
      var index = this.globalVar.tabIndex;
      if(index == '2'){
        var OpenTicketpageValue = this.globalVar.OpenTicketpageValue;
        this.router.navigate(['/pages/adminDashboard'],{queryParams:{index:index,OpenTicketpageValue:OpenTicketpageValue}});
      }else if(index == '3'){
        var newTicketpageValue = this.globalVar.newTicketpageValue;
        this.router.navigate(['/pages/adminDashboard'],{queryParams:{index:index,newTicketpageValue:newTicketpageValue}});
      }else if(index == '4'){
        var CloseTicketpageValue = this.globalVar.CloseTicketpageValue;
        this.router.navigate(['/pages/adminDashboard'],{queryParams:{index:index,CloseTicketpageValue:CloseTicketpageValue}});
      }else if(index == '5'){
        var page = this.globalVar.ViewpageValue;
        this.router.navigate(['/pages/help'],{queryParams:{page:page}});
      }
    }


    writeComment(role,email){
      var response =  this.supportapi.commentOnTicket(this.ticketData.ticket_id,this.comment,role,email);
        response.subscribe(
        data => {
          this.toastrService.show(
            status || 'Success',       
            `Comment added successfully ! ! `, 
          );
        this.ngOnInit();
        
        },
        error => {
          console.error("commentOnTicket : ", error);
        }
      ); 
    }

    changeStatus(event){
      var response =  this.supportapi.updateStatus(this.ticketData.ticket_id,event.value);
        response.subscribe(
        data => {
          
        },
        error => {
          console.error("changeStatus : ", error);
        }
      ); 
    }

}