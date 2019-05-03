import { Component, Input,ViewChild, ElementRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Router} from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'nb-dialog',
    template: `
    <div *ngIf = "peerstatus == 'online' ">
      <nb-card [style.width.px]="350" [style.height.px]="350" status="primary">
      <nb-card-header>Enter your phone/contact number</nb-card-header>
      <nb-card-body>
      <int-phone-prefix [(ngModel)]="phone_number"></int-phone-prefix>
      <div style="visibility:hidden; color: red;" id="num1">Please Select Country Code</div>
      <div style="visibility:hidden; color: red;" id="num">phone/contact number required</div>
      </nb-card-body>
      <nb-card-footer>
        <button nbButton hero status="primary" (click)="onlineCall()" >Call</button><button nbButton hero status="primary" (click)="dismiss()" >Close</button>
      </nb-card-footer>
      </nb-card>
    </div>
    <div *ngIf = "peerstatus == 'offline' ">
    <nb-card [style.width.px]="350" [style.height.px]="450" status="primary">
    <nb-card-header>Enter your phone/contact number</nb-card-header>
    <nb-card-body>
    <int-phone-prefix [(ngModel)]="phone_number"></int-phone-prefix>
    <div style="visibility:hidden; color: red;" id="num1">Please Select Country Code</div>
    <div style="visibility:hidden; color: red;" id="num">phone/contact number required</div>
    <b> Peer is not available now.Please select time by clicking on below box for scheduling your call</b>
    <div class="24hr-example">
    <p-calendar [readonlyInput]="true" [(ngModel)]="mytime" [timeOnly]="true"></p-calendar>
       </div>   
    <div style="visibility:hidden; color: red;" id="time">This Peer is not available at entered time.Please select time between {{available_to}} to {{available_from}}</div>
    </nb-card-body>
    <nb-card-footer>
      <button nbButton hero status="primary" (click)="offlineCall()" >Call</button><button nbButton hero status="primary" (click)="dismiss()" >Close</button>
    </nb-card-footer>
    </nb-card>
  </div>
    `,
    })
export class PeerComponent {
  @Input()  peerstatus:string;
  @Input()  available_to:string;
  @Input()  available_from:string;
  @Input()  mobile :string;
  @Input() peer_id:string;
  @ViewChild('Time')  timenew:ElementRef
alertflag=0;
otpalertflag=0;
phone_number;
num;
time;
fullTime;
editableDial;
peer_cntc;
peer;
mytime;
    constructor(protected ref: NbDialogRef<PeerComponent>,
      private router : Router,
      protected api : ApiService,
      private toastrService: NbToastrService,
      private datePipe: DatePipe
      ) {
    }

    onlineCall(){
     var duration = 10000;
      this.num = this.phone_number;
      this.peer_cntc = this.mobile;
      if(this.num == undefined){
        document.getElementById('num').style.visibility = "visible";
      }else if(this.num != undefined){
        if(this.num.charAt(0)!='+'){
          document.getElementById('num1').style.visibility = "visible";
        }else{
        document.getElementById('num').style.visibility = "hidden";
        this.ref.close();
        this.api.peerCall( this.num,this.peer_cntc).subscribe(data=>{
          if(data['status'] == 400){
           this.toastrService.show(
             ` `+data['message'],
              duration 
           );
           
          }else if(data['status'] == 404){
           this.toastrService.show(
             ` `+data['message'],
           duration 
         );
   
          }else{
           this.toastrService.show(
             ` `+data['data'],
             duration 
          );
   
          }
       });
        }
      
   
      }
    }

    offlineCall(){
      var duration = 10000;
      this.num = this.phone_number;
      this.peer_id = this.peer_id;
      this.timenew;
      //this.mytime =this.timenew.nativeElement.value+ ':00' ;
      var t= this.mytime;
      var dateFormat = new DatePipe('en-ISO');
      
      this.time=this.datePipe.transform(t,"HH:mm:ss");
      this.peer_cntc = this.mobile;
      this.available_from =this.available_from;
      this.available_to =this.available_to;
      if(this.num == undefined){
        document.getElementById('num').style.visibility = "visible";
      }else if(this.num != undefined){
        if(this.num.charAt(0)!='+'){
          document.getElementById('num1').style.visibility = "visible";
        }else{
      
          this.ref.close();
          this.api.callSchedule( this.peer_id,this.num,this.peer_cntc, this.time,this.available_to,this.available_from).subscribe(data=>{
            if(data['status'] == 404){
              this.toastrService.show(
                ` `+data['message'],
                duration 
              );
              
            }else if(data['status'] == 200){
              this.toastrService.show(
                ` `+'Call is scheduled. You will get a call on scheduled time.',
              duration 
            );
      
            }
        });
        }

      }
     
    }

    close()
    {
        this.alertflag=0; 

    }
    dismiss() {
      this.ref.close();
    }
    
}