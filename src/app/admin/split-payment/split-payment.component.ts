import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {Message} from 'primeng/components/common/api';
import { IfStmt } from '@angular/compiler';


@Component({
  selector: 'ngx-split-payment',
  templateUrl: './split-payment.component.html',
	styleUrls: ['./split-payment.component.scss'],
	providers: [MessageService]
})
export class SplitPaymentComponent implements OnInit {
	tab_type: string;
	public filterText: string;
	public filterPlaceholder: string;
	public filterInput = new FormControl();
	Total_data: any;
	edu_share: any;
	p: number = 1;
	msgs: Message[] = [];
	loadingbutton = false;

    constructor(	
	  protected adminApi : AdminApiService,
	  private router : Router
      ) {
        
		}
		
		ngOnInit() {
			this.filterText = "";
			this.filterPlaceholder = "Search";
			this.loadingbutton = true;
			this.adminApi.getPaymentDetails('1stRefund').subscribe(data=>{
				this.loadingbutton = false;
				this.Total_data = data['data'];
			});
			this.filterInput
			.valueChanges
			.debounceTime(200)
			.subscribe(term => {
				this.filterText = term;
			});
		}

		tab(e) {
			var index = e.index;
			this.msgs = [];
			if(index == 0){
			this.tab_type = '1stRefund';
			this.loadingbutton = true;
			this.adminApi.getPaymentDetails('1stRefund').subscribe(data=>{
				this.loadingbutton = false;
				this.Total_data = data['data'];
			});
			}else if(index == 1){
				this.tab_type = '2ndSplit';
				this.loadingbutton = true;
				this.adminApi.getPaymentDetails('2ndSplit').subscribe(data=>{
					this.loadingbutton = false;
					this.Total_data = data['data'];
				});
			}else if(index == 2){
				this.tab_type = "2ndRefund";
				this.loadingbutton = true;
				this.adminApi.getPaymentDetails('2ndRefund').subscribe(data=>{
					this.loadingbutton = false;
					this.Total_data = data['data'];
				});
			}else if(index == 3){
				this.tab_type = '3rdSplit';
				this.loadingbutton = true;
				this.adminApi.getPaymentDetails('3rdSplit').subscribe(data=>{
					this.loadingbutton = false;
					this.Total_data = data['data'];
				});
			}else if(index == 4){
				this.tab_type = "3rdRefund";
				this.loadingbutton = true;
				this.adminApi.getPaymentDetails('3rdRefund').subscribe(data=>{
					this.loadingbutton = false;
					this.Total_data = data['data'];
				});
			}else if(index == 5){
				this.tab_type = "refundDetails";
				this.loadingbutton = true;
				this.adminApi.getPaymentDetails('refundDetails').subscribe(data=>{
					this.loadingbutton = false;
					this.Total_data = data['data'];
				});
			}
		} 

		proceed2ndSplit(order_id,available_amount,ccavenue_share,reference_no){
			var edu_share = ((document.getElementById("edu_share"+order_id) as HTMLInputElement).value);
			var uni_share = ((document.getElementById("uni_share"+order_id) as HTMLInputElement).value);
			if(edu_share != '' && uni_share != ''){
				if(edu_share == '0' && uni_share == '0'){
					this.msgs = [];
					this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Split amounts should not be equal to 0!!!"});
				}else{
					var total = parseFloat(edu_share) + parseFloat(uni_share);
					if(total.toFixed(2) == available_amount){
						this.loadingbutton = true;
						this.adminApi.proceed2ndSplit(order_id,parseFloat(edu_share).toFixed(2),parseFloat(uni_share).toFixed(2),ccavenue_share,reference_no).subscribe(data=>{
							this.loadingbutton = false;
							if(data['status'] == 200){
								this.msgs = [];
								this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully splited data for this student!!!!'});
								var obj = {
									index: 1
								};
								this.tab(obj);
							}else if(data['status'] == 400){
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in spliting data..Please Try again later!!!'});
							}else{
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
							}
						});
					}else{
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:'You can not split amount as, Requested Split amount is not equal to Available Amount!!!'});
					}
				}
			}else{
				if(edu_share != ''){
					if(edu_share == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Split amounts should not be equal to 0!!!"});
					}else{
						if(parseFloat(edu_share).toFixed(2) == available_amount){
							this.loadingbutton = true;
							this.adminApi.proceed2ndSplit(order_id,parseFloat(edu_share).toFixed(2),0,ccavenue_share,reference_no).subscribe(data=>{
								this.loadingbutton = false;
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully splited data for this student!!!!'});
									var obj = {
										index: 1
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in spliting data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:'You can not split amount as, Requested Split amount is not equal to Available Amount!!!'});
						}
					}
				}else if(uni_share != ''){
					if(uni_share == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Split amounts should not be equal to 0!!!"});
					}else{
						if(parseFloat(uni_share).toFixed(2) == available_amount){
							this.loadingbutton = true;
							this.adminApi.proceed2ndSplit(order_id,0,parseFloat(uni_share).toFixed(2),ccavenue_share,reference_no).subscribe(data=>{
								this.loadingbutton = false;
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully splited data for this student!!!!'});
									var obj = {
										index: 1
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in spliting data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:'You can not split amount as, Requested Split amount is not equal to Available Amount!!!'});
						}
					}
				}else{
					this.msgs = [];
					this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Please enter split amount!!!"});
				}
			}
		}

		proceed3rdSplit(order_id,available_amount,college_amount,edulab_amount,ccavenue_share,reference_no,application_id){
			var edulab_share = ((document.getElementById("edulab_share"+order_id) as HTMLInputElement).value);
			var col_share = ((document.getElementById("col_share"+order_id) as HTMLInputElement).value);
			if(edulab_share != '' && col_share != ''){
				if(edulab_share == '0' && col_share == '0'){
					this.msgs = [];
					this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Split amounts should not be equal to 0!!!"});
				}else{
					if((edulab_share == edulab_amount) && (col_share == college_amount)){
						this.loadingbutton = true;
						this.adminApi.proceed3rdSplit(order_id,parseFloat(edulab_share).toFixed(2),parseFloat(col_share).toFixed(2),ccavenue_share,reference_no,application_id).subscribe(data=>{
							this.loadingbutton = false;
							if(data['status'] == 200){
								this.msgs = [];
								this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully splited data for this student!!!!'});
								var obj = {
									index: 3
								};
								this.tab(obj);
							}else if(data['status'] == 400){
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in spliting data..Please Try again later!!!'});
							}else if(data['status'] == 401){
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'SubAccId is not in database for this course.Please add it in database and proceed later!!!'});
							}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
							}
						});
					}else{
						if((edulab_share == '0') || (col_share == '0')){
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Split amounts should not be equal to 0!!!"});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Edulab share should be equal to edulab amount And College Share should be equal to college amount!!!!"});
						}			
					}
				}
			}else{
				this.msgs = [];
				this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed split !!! Please enter both split amount!!!"});
			}
		}

		proceedRefund(order_no,order_id,edu_share,uni_share,cc_share,reference_no){
			var edu_refund = ((document.getElementById("edu_refund"+order_no+order_id) as HTMLInputElement).value);
			var uni_refund = ((document.getElementById("uni_refund"+order_no+order_id) as HTMLInputElement).value);
			var cc_refund = ((document.getElementById("cc_refund"+order_no+order_id) as HTMLInputElement).value);
			if(edu_refund != '' && uni_refund != '' && cc_refund != ''){
				if(edu_refund == '0' && uni_refund == '0'  && cc_refund == '0'){
					this.msgs = [];
					this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
				}else{
					if((parseFloat(edu_refund) <= parseFloat(edu_share)) && (parseFloat(uni_refund) <= parseFloat(uni_share)) && (parseFloat(cc_refund) <= parseFloat(cc_share))){
						this.adminApi.proceedRefund(order_no,order_id,edu_refund,uni_refund,cc_refund,reference_no).subscribe(data=>{
							if(data['status'] == 200){
								this.msgs = [];
								this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
								if(order_no == '1'){
									var obj = {
										index: 0
									};
									this.tab(obj);
								}else if(order_no == '2'){
									var obj = {
										index: 2
									};
									this.tab(obj);
								}
							}else if(data['status'] == 400){
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
							}else{
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
							}
						});
					}else{
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
					}
				}
			}else{
				if(edu_refund != '' && uni_refund != ''){
					if(edu_refund == '0' && uni_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
					}else{
						if((parseFloat(edu_refund) <= parseFloat(edu_share)) && (parseFloat(uni_refund) <= parseFloat(uni_share))){
							this.adminApi.proceedRefund(order_no,order_id,edu_refund,uni_refund,0,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									if(order_no == '1'){
										var obj = {
											index: 0
										};
										this.tab(obj);
									}else if(order_no == '2'){
										var obj = {
											index: 2
										};
										this.tab(obj);
									}
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
						}
					}
				}else if(edu_refund != '' && cc_refund != ''){
					if(edu_refund == '0' && cc_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
					}else{
						if((parseFloat(edu_refund) <= parseFloat(edu_share)) && (parseFloat(cc_refund) <= parseFloat(cc_share))){
							this.adminApi.proceedRefund(order_no,order_id,edu_refund,0,cc_refund,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									if(order_no == '1'){
										var obj = {
											index: 0
										};
										this.tab(obj);
									}else if(order_no == '2'){
										var obj = {
											index: 2
										};
										this.tab(obj);
									}
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
						}
					}
				}else if(uni_refund != '' && cc_refund != ''){
					if(uni_refund == '0' && cc_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
					}else{
						if((parseFloat(uni_refund) <= parseFloat(uni_share)) && (parseFloat(cc_refund) <= parseFloat(cc_share))){
							this.adminApi.proceedRefund(order_no,order_id,0,uni_refund,cc_refund,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									if(order_no == '1'){
										var obj = {
											index: 0
										};
										this.tab(obj);
									}else if(order_no == '2'){
										var obj = {
											index: 2
										};
										this.tab(obj);
									}
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
						}
					}
				}else if(edu_refund != ''){
					if(edu_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Edulab refund amount should not be equal to 0!!!"});
					}else{
						if(parseFloat(edu_refund) <= parseFloat(edu_share)){
							this.adminApi.proceedRefund(order_no,order_id,edu_refund,0,0,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									if(order_no == '1'){
										var obj = {
											index: 0
										};
										this.tab(obj);
									}else if(order_no == '2'){
										var obj = {
											index: 2
										};
										this.tab(obj);
									}
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Edulab refund amount you have entered should not be greater than Edulab share!!!"});
						}
					}
				}else if(uni_refund != ''){
						if(uni_refund == '0'){
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! University refund amount should not be equal to 0!!!"});
						}else{
							if(parseFloat(uni_refund) <= parseFloat(uni_share)){
								this.adminApi.proceedRefund(order_no,order_id,0,uni_refund,0,reference_no).subscribe(data=>{
									if(data['status'] == 200){
										this.msgs = [];
										this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
										if(order_no == '1'){
											var obj = {
												index: 0
											};
											this.tab(obj);
										}else if(order_no == '2'){
											var obj = {
												index: 2
											};
											this.tab(obj);
										}
									}else if(data['status'] == 400){
										this.msgs = [];
										this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
									}else{
										this.msgs = [];
										this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
									}
								});
							}else{
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! University refund amount you have entered should not be greater than University share!!!"});
							}
						}
				}else if(cc_refund != ''){
					if(cc_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! CCAvenue refund amount should not be equal to 0!!!"});
					}else{
						if(parseFloat(cc_refund) <= parseFloat(cc_share)){
							this.adminApi.proceedRefund(order_no,order_id,0,0,cc_refund,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									if(order_no == '1'){
										var obj = {
											index: 0
										};
										this.tab(obj);
									}else if(order_no == '2'){
										var obj = {
											index: 2
										};
										this.tab(obj);
									}
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! CCAvenue refund amount you have entered should not be greater than CCAvenue share!!!"});
						}
					}
			}else{
					this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Please enter refund amount!!!"});
				}			
			}
		}

		proceed3rdRefund(order_no,application_id,order_id,edu_share,col_share,cc_share,reference_no){
			var edu_refund = ((document.getElementById("edu_refund"+order_no+order_id) as HTMLInputElement).value);
			var col_refund = ((document.getElementById("col_refund"+order_no+order_id) as HTMLInputElement).value);
			var cc_refund = ((document.getElementById("cc_refund"+order_no+order_id) as HTMLInputElement).value);
			if(edu_refund != '' && col_refund != '' && cc_refund != ''){
				if(edu_refund == '0' && col_refund == '0'  && cc_refund == '0'){
					this.msgs = [];
					this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
				}else{
					if((parseFloat(edu_refund) <= parseFloat(edu_share)) && (parseFloat(col_refund) <= parseFloat(col_share)) && (parseFloat(cc_refund) <= parseFloat(cc_share))){
						this.adminApi.proceed3rdRefund(order_no,application_id,order_id,edu_refund,col_refund,cc_refund,reference_no).subscribe(data=>{
							if(data['status'] == 200){
								this.msgs = [];
								this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
								var obj = {
									index: 4
								};
								this.tab(obj);
							}else if(data['status'] == 400){
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
							}else{
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
							}
						});
					}else{
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
					}
				}
			}else{
				if(edu_refund != '' && col_refund != ''){
					if(edu_refund == '0' && col_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
					}else{
						if((parseFloat(edu_refund) <= parseFloat(edu_share)) && (parseFloat(col_refund) <= parseFloat(col_share))){
							this.adminApi.proceed3rdRefund(order_no,application_id,order_id,edu_refund,col_refund,0,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									var obj = {
										index: 4
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
						}
					}
				}else if(edu_refund != '' && cc_refund != ''){
					if(edu_refund == '0' && cc_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
					}else{
						if((parseFloat(edu_refund) <= parseFloat(edu_share)) && (parseFloat(cc_refund) <= parseFloat(cc_share))){
							this.adminApi.proceed3rdRefund(order_no,application_id,order_id,edu_refund,0,cc_refund,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									var obj = {
										index: 4
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
						}
					}
				}else if(col_refund != '' && cc_refund != ''){
					if(col_refund == '0' && cc_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts should not be equal to 0!!!"});
					}else{
						if((parseFloat(col_refund) <= parseFloat(col_share)) && (parseFloat(cc_refund) <= parseFloat(cc_share))){
							this.adminApi.proceed3rdRefund(order_no,application_id,order_id,0,col_refund,cc_refund,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									var obj = {
										index: 4
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Refund amounts you have entered should not be greater than share amounts!!!"});
						}
					}
				}else if(edu_refund != ''){
					if(edu_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Edulab refund amount should not be equal to 0!!!"});
					}else{
						if(parseFloat(edu_refund) <= parseFloat(edu_share)){
							this.adminApi.proceed3rdRefund(order_no,application_id,order_id,edu_refund,0,0,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									var obj = {
										index: 4
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Edulab refund amount you have entered should not be greater than Edulab share!!!"});
						}
					}
				}else if(col_refund != ''){
						if(col_refund == '0'){
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! College refund amount should not be equal to 0!!!"});
						}else{
							if(parseFloat(col_refund) <= parseFloat(col_share)){
								this.adminApi.proceed3rdRefund(order_no,application_id,order_id,0,col_refund,0,reference_no).subscribe(data=>{
									if(data['status'] == 200){
										this.msgs = [];
										this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
										var obj = {
											index: 4
										};
										this.tab(obj);
									}else if(data['status'] == 400){
										this.msgs = [];
										this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
									}else{
										this.msgs = [];
										this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
									}
								});
							}else{
								this.msgs = [];
								this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! College refund amount you have entered should not be greater than College share!!!"});
							}
						}
				}else if(cc_refund != ''){
					if(cc_refund == '0'){
						this.msgs = [];
						this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! CCAvenue refund amount should not be equal to 0!!!"});
					}else{
						if(parseFloat(cc_refund) <= parseFloat(cc_share)){
							this.adminApi.proceed3rdRefund(order_no,application_id,order_id,0,0,cc_refund,reference_no).subscribe(data=>{
								if(data['status'] == 200){
									this.msgs = [];
									this.msgs.push({severity:'success', summary:'Success Message', detail:'Successfully Refunded data for this student!!!!'});
									var obj = {
										index: 4
									};
									this.tab(obj);
								}else if(data['status'] == 400){
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Problem in refunding data..Please Try again later!!!'});
								}else{
									this.msgs = [];
									this.msgs.push({severity:'error', summary:'Error Message', detail:'Network problem..Please Try again later!!!'});
								}
							});
						}else{
							this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! CCAvenue refund amount you have entered should not be greater than CCAvenue share!!!"});
						}
					}
			}else{
					this.msgs = [];
							this.msgs.push({severity:'error', summary:'Error Message', detail:"Can't proceed refund !!! Please enter refund amount!!!"});
				}			
			}
		}
  }
