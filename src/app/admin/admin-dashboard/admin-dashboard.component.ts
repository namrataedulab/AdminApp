import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NativeDateAdapter, DateAdapter, MatDatepicker } from '@angular/material';
import * as _moment from 'moment';
import * as $ from 'jquery';
import { config } from '../../../../config';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import {Data} from '../../shared/data';

const moment = _moment;

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = 'MMMM YYYY';
    return moment(date).format(formatString);
  }
}
@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss'],
	providers: [
    {
      provide: DateAdapter, useClass: CustomDateAdapter
    }
  ]
})
export class AdminDashboardComponent implements OnInit {
	p: number = 1;
	OpenTicketp: number = 1;
	newTicketp: number = 1;
	CloseTicketp: number = 1;
	data: any;
	profile_completeness: any;
	Twenty: number;
	Ten: number;
	Fourty: number;
	Sixty: number;
	Eighty: number;
	Hundred: number;
	public filterText: string;
	public filterPlaceholder: string;
	public filterInput = new FormControl();
	tab_type: string;
	Total_data: any;
	dashboardData: any;
	pie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
	Eligibility_pending: any;
	Application_Accepted: any;
	College_Allotment: any;
	ticketsData: any;
	show = true;
	length ;
	Count: any;
	selectedYear ='2019';
	loadingbutton;
	email_pie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
	show_emailPie;
	i: any;
	sms_pie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
	show_smsPie;
	yesterday;
	month;
	year;
	courses;
	coursesList: any;
	spec;
	specializationList: any;
	courseVisits;
	course_pie: { labels: string[]; datasets: { data: any[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
	showCount = 0;
	loading;
	collegeList ;
	college ;
	collegeData ;
	pieData = 0;
	serverUrl: string;
	fileUrl: string;
    constructor(	
	  protected adminApi : AdminApiService,
		private router : Router,
		private authService : NbAuthService,
		private globalVar : Data,
		private route : ActivatedRoute,
      ) {
        this.authService.onTokenChange()
					.subscribe((token: NbAuthJWTToken) => {
					if(!(token.getPayload()['role'] =="admin" || token.getPayload()['role'] =="sub_admin")){
							this.router.navigate(['auth/logout'])
					}
				});
		}
		pieChartOptions = {
			responsive: true
		}
		pieChartLabels  :any ;
		pieChartColor  :any ;
		pieChartData:any ;
		
		@ViewChild(MatDatepicker) picker;
		@ViewChild(MatDatepicker) picker1;
		date = new FormControl();
	
		monthSelected(params) {
			this.show_emailPie = 0;
			this.date.setValue(params);
			this.picker.close();
			this.loadingbutton = true;
			this.adminApi.getEmailActivityTrackerMonthWise(params).subscribe(data =>{
				this.loadingbutton = false;
				this.show_emailPie = 1;
				this.email_pie = {
					labels: ['Emails Opened :- '+data['open_count'],'Emails Not Opened :- '+data['not_open']],
					datasets: [
							{
									data: [	data['open_count'], data['not_open'] 	],
									backgroundColor: [
										"#88C443",
										"#F3354C"
									],
									hoverBackgroundColor: [
										"#FFCE56",
										"#FF6384"
									]
							}]    
					};
			});
		}

		monthSelectedSMS(params) {
			this.show_smsPie = 0;
			this.date.setValue(params);
			this.picker1.close();
			this.loadingbutton = true;
			this.adminApi.getSMSTrackerMonthWise(params).subscribe(data =>{
				this.loadingbutton = false;
				this.show_smsPie = 1;
				this.sms_pie = {
					labels: ['delivered :- '+data['delivered'],'undelivered :- '+data['undelivered'],'sent :- '+data['sent'],'failed :- '+data['failed'],'queued :- '+data['queued'],'received :- '+data['received']],
					datasets: [
							{
									data: [	data['delivered'], data['undelivered'],data['sent'], data['failed'],data['queued'], data['received'] 	],
									backgroundColor: [
										"#88C443",
										"#F3354C",
										"#14BAEB",
										"#2e9e73",
										"#d35ce0",
										"#ebaa14"
									],
									hoverBackgroundColor: [
										"#FFCE56",
										"#FF6384",
										"#36A2EB",
										"#3a5b3c",
										"#de8be8",
										"#f4ee7f"
									]
							}]    
					};
			});
		}

  	ngOnInit() {
			this.serverUrl = config.serverUrl;
    	this.fileUrl = config.fileUrl;
			try {
				this.i = this.route.snapshot.queryParamMap.get('index');
				
					if(this.i == 2){
						this.p = parseInt(this.route.snapshot.queryParamMap.get('OpenTicketpageValue'));
						this.tab_type = "open_tickets";
						this.adminApi.getTickets(this.tab_type).subscribe(data =>{
							
							if(data['data']){
								this.show = true;
								this.ticketsData = data['data'];
								this.length = this.ticketsData.length;
							}else{
								this.show = false;
								this.length = 0;
							}
						})
					}else if(this.i == 3){
						this.p = parseInt(this.route.snapshot.queryParamMap.get('newTicketpageValue'));
						this.tab_type = "new_tickets";
						this.adminApi.getTickets(this.tab_type).subscribe(data =>{
							if(data['data']){
								this.show = true;
								this.ticketsData = data['data'];
								this.length = this.ticketsData.length;
							}else{
								this.show = false;
								this.length = 0;
							}
						})
					}else if(this.i == 4){
						this.p = parseInt(this.route.snapshot.queryParamMap.get('CloseTicketpageValue'));
						this.tab_type = "closed_tickets";
						this.adminApi.getTickets(this.tab_type).subscribe(data =>{
							if(data['data']){
								this.show = true;
								this.ticketsData = data['data'];
								this.length = this.ticketsData.length;
							}else{
								this.show = false;
								this.length = 0;
							}
						})
					}
			} catch (error) {
        console.error("Error from ngOnInit => "+error);
      }
    	this.filterText = "";
			this.filterPlaceholder = "Search";
			this.adminApi.getTotal('admission').subscribe(data=>{
				this.Total_data = data['data'];
			})
			this.filterInput
			.valueChanges
			.debounceTime(200)
			.subscribe(term => {
				this.filterText = term;
			});
    	this.adminApi.profile_completeness(this.selectedYear).subscribe(data=>{
				if(data['data']['data'].length > 0){
					this.Ten = parseInt(data['data']['data'][0]['Ten']);
					this.Twenty = parseInt(data['data']['data'][0]['Twenty']);
					this.Fourty = parseInt(data['data']['data'][0]['Fourty']);
					this.Sixty = parseInt(data['data']['data'][0]['Sixty']);
					this.Eighty = parseInt(data['data']['data'][0]['Eighty']);
					this.Hundred = parseInt(data['data']['data'][0]['Hundred']);
					this.Count = data['data']['count']
					this.data = {
						
						labels: ['10%','20%', '40%', '60%', '80%', '100%'],
						datasets: [
							{
								label: 'Profile Completeness',
								backgroundColor: " #2e9e73",
								hoverBackgroundColor:"#3a5b3c",                      
								data: [ this.Ten, this.Twenty,this.Fourty,  this.Sixty,  this.Eighty,  this.Hundred]
							},
						]
					}
				}
			
		})
		
	}

  	tab(e) {
		this.p = 1;
		var index = e.index;
		this.globalVar.tabIndex=index;
		if(index == 0){
			this.tab_type = 'new'
		}else if(index == 1){
			this.tab_type = 'admission';
			this.adminApi.getTotal(this.tab_type).subscribe(data=>{
				this.Total_data = data['data'];
			  })
				this.filterInput
				.valueChanges
				.debounceTime(200)
				.subscribe(term => {
					this.filterText = term;
				});
				this.adminApi.getStudenttracking().subscribe(data=>{
					this.Eligibility_pending = data['data'][0]['Eligibility'];
					this.Application_Accepted = data['data'][0]['Secondpayement'];
					this.College_Allotment = data['data'][0]['Thirdpayement'];
					this.pie = {
						labels: ['Eligibility Pending','Application Accepted','College Allotment'],
						datasets: [
								{
										data: [	this.Eligibility_pending, 	this.Application_Accepted, 	this.College_Allotment],
										backgroundColor: [
												"#F3354C",
												"#14BAEB",
												"#88C443"
										],
										hoverBackgroundColor: [
												"#FF6384",
												"#36A2EB",
												"#FFCE56"
										]
								}]    
						};
				})
		}else if(index == 2){
			this.tab_type = "open_tickets";
			this.globalVar.OpenTicketpageValue = 1;
			this.adminApi.getTickets(this.tab_type).subscribe(data =>{
				
				if(data['data']){
          this.show = true;
          this.ticketsData = data['data'];
          this.length = this.ticketsData.length;
        }else{
          this.show = false;
          this.length = 0;
        }
			})
		}else if(index == 3){
			this.tab_type = "new_tickets";
			this.globalVar.newTicketpageValue=1;
			this.adminApi.getTickets(this.tab_type).subscribe(data =>{
				if(data['data']){
          this.show = true;
          this.ticketsData = data['data'];
          this.length = this.ticketsData.length;
        }else{
          this.show = false;
          this.length = 0;
        }
			})
		}else if(index == 4){
			this.tab_type = "closed_tickets";
			this.globalVar.CloseTicketpageValue= 1;
			this.adminApi.getTickets(this.tab_type).subscribe(data =>{
				if(data['data']){
          this.show = true;
          this.ticketsData = data['data'];
          this.length = this.ticketsData.length;
        }else{
          this.show = false;
          this.length = 0;
        }
			})
		}else if(index == 5){
			this.tab_type = "email_tracker";
			this.loadingbutton = true;
			this.adminApi.getEmailActivityTracker().subscribe(data =>{
				this.loadingbutton = false;
			});
		}else if(index == 6){
			this.tab_type = "sms_tracker";
			var today = new Date();
			var date = today.getDate() ;
			var month = today.getMonth() + 1;
			var year = today.getFullYear();
			var yesterday = date - 1;
			this.yesterday = yesterday;
			this.month = month;
			this.year = year;
		}else if(index == 7){
			this.tab_type = "course_visits";
			this.loadingbutton = true;
			this.adminApi.getCourseNames().subscribe(data => { 
				this.loadingbutton = false;
				this.coursesList =  data['data']['courses'];	
			});
		}else if(index == 8){
			this.tab_type = "college_visits";
			this.loadingbutton = true;
			this.adminApi.getAllCollegeNames().subscribe(data => { 
				this.loadingbutton = false;
				this.collegeList =  data['data'];	
			});
		}

		if(this.tab_type === 'admission' ||   this.tab_type ==='institute'){
			
		}else{
			this.adminApi.profile_completeness(this.selectedYear).subscribe(data=>{       
				this.Ten = parseInt(data['data']['data'][0]['Ten']);
				this.Twenty = parseInt(data['data']['data'][0]['Twenty']);
				this.Fourty = parseInt(data['data']['data'][0]['Fourty']);
				this.Sixty = parseInt(data['data']['data'][0]['Sixty']);
				this.Eighty = parseInt(data['data']['data'][0]['Eighty']);
				this.Hundred = parseInt(data['data']['data'][0]['Hundred']);
				this.Count = data['data']['count']
				this.data = {
					
					labels: ['10%','20%', '40%', '60%', '80%', '100%'],
					datasets: [
						{
							label: 'Profile Completeness',
							backgroundColor: " #2e9e73",
							hoverBackgroundColor:"#3a5b3c",                      
							data: [ this.Ten, this.Twenty,this.Fourty,  this.Sixty,  this.Eighty,  this.Hundred]
						},
					]
				}
			})

		}
		
   
  
	} 

	getspecialization(name){
		this.showCount = 0;
		this.loadingbutton = true;
		this.adminApi.getSpecialization(name)
		.subscribe(data => { 
			this.loadingbutton = false;
			this.specializationList =  data['data']['specialization'];
		});
	}

	getCourseVisits(specialization){
		this.loading = true;
		this.adminApi.getCourseVisits(specialization).subscribe(data => {
			this.loading = false;
			if(data['data'].length > 0){
				this.showCount = 1;
				this.courseVisits = data['data'];
				this.course_pie = {
					labels: ['Course Visits :- '+data['data'].length],
					datasets: [
							{
									data: [	data['data'].length],
									backgroundColor: [
										"#88C443"
									],
									hoverBackgroundColor: [
										"#FFCE56"
									]
							}]    
					};
			}else{
				console.log('No results found');
				this.showCount = 0;
			}
		})
	}

	getCollegeCourseDetails(college_name){
		this.pieData = 0;
		this.loadingbutton = true;
		this.adminApi.getCollegeCourseDetails(college_name).subscribe(data => {
		this.loadingbutton = false;
			if(data['status'] == 200){
				this.collegeData = data['data'];
				var label = [];
				var count = [];
				for(var a in data['counts']){
					label.push(data['counts'][a]['course']);
					count.push(data['counts'][a]['count']);
				}
				this.pieChartLabels = label;
				this.pieChartData = [
					{ 
							data: count
					}
				];
				this.pieData = 1;
			}else{
				this.pieData = 0;
			}
		})
	}

	newTicketpageChanged(p){
		this.p = p;
		this.globalVar.newTicketpageValue=p;
	}

	openTicketpageChanged(p){
		this.p = p;
		this.globalVar.OpenTicketpageValue=p;
	}

	closeTicketpageChanged(p){
		this.p = p;
		this.globalVar.CloseTicketpageValue=p;
	}

	filterYear(tab_type,year){
		this.adminApi.profile_completeness(year).subscribe(data=>{    
			this.Ten = parseInt(data['data']['data'][0]['Ten']);
			this.Twenty = parseInt(data['data']['data'][0]['Twenty']);
			this.Fourty = parseInt(data['data']['data'][0]['Fourty']);
			this.Sixty = parseInt(data['data']['data'][0]['Sixty']);
			this.Eighty = parseInt(data['data']['data'][0]['Eighty']);
			this.Hundred = parseInt(data['data']['data'][0]['Hundred']);
			this.Count = data['data']['count']
			this.data = {
				
				labels: ['10%','20%', '40%', '60%', '80%', '100%'],
				datasets: [
					{
						label: 'Profile Completeness',
						backgroundColor: " #2e9e73",
						hoverBackgroundColor:"#3a5b3c",                      
						data: [ this.Ten, this.Twenty,this.Fourty,  this.Sixty,  this.Eighty,  this.Hundred]
					},
				]
			}
		
		})
    
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

	viewMore(category,userId,courseId,tab,applicationId){
		this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
	  }

	preview(user_id,course_id,application_id){
	this.adminApi.preview(user_id,course_id,application_id).subscribe(data => {
		if(data[`status`] == 200){
		// this.adminApi.downloadFiles(data[`data`])
		// .subscribe(data => {
		// 	saveAs(data, application_id+'_Preview.pdf');    
		// });
			var myInput = document.getElementById('prevLet'+application_id);
			myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+user_id+'/'+application_id+'_Preview.pdf');
		}else{
		alert("You Can't Download Preview Letter!!!!!!")
		}
	
	})
	
	}
	
	preview_data_with_Preferences(user_id,course_id,application_id){
	this.adminApi.preview_data_with_Preferences(user_id,course_id,application_id).subscribe(data => {
		if(data[`status`] == 200){
		// this.adminApi.downloadFiles(data[`data`])
		// .subscribe(data => {
		// 	saveAs(data, application_id+'_Preview_Pref.pdf');    
		// });
		
		var myInput = document.getElementById('prevLetPref'+application_id);
		myInput.setAttribute('href', config.serverUrl+'/upload/transcript/'+user_id+'/'+application_id+'_Preview_Pref.pdf');
	}else{
		alert("You Can't Download Preview Letter!!!!!!")
		}
	
	})
	}
	showprovisionalLetterApp(user_id,course_id,application_id){
		// this.adminApi.showprovisionalLetterApp(user_id,course_id,application_id).subscribe(data => {
		//   if(data[`status`] == 200){
			var pdf = config.fileUrl+'/public/upload/transcript/'+user_id+'/'+application_id+'_Confirmation_provisional_Letter.pdf'
			this.adminApi.downloadFiles(pdf)
			.subscribe(data => {
			  saveAs(data, application_id+'_Confirmation_provisional_Letter.pdf');    
			});
		   
		//   }else{
		// 	alert("You Can't Download Preview Letter!!!!!!")
		//   }
	  
		// })
	}
		
		openTicket(ticket_id){
			this.router.navigate(['pages/viewTicket'],{queryParams:{ticket_uid:ticket_id}});
		}

  }



