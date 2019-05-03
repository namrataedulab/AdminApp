/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {  Component, ɵConsole } from '@angular/core';
import {MessageService} from 'primeng/api';
import { ApiService } from '../../shared/api.service';
import { CountriesService } from '../../@core/data/countries.service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { NbDateService,NbDialogService,NbToastrService } from '@nebular/theme';
import { TermsComponent } from './terms.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {ConfirmationService} from 'primeng/api';
import { ConfirmPassComponent } from './confirmPass.component';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent{
	email:any;
	RegisterForm: FormGroup;
	Countries: any [];
	alertflag = 0;
	messgealertflag = 0;
	messages;
	validation_messages;
	permCountry;
	selectedGender;
	selectedCategory;
	Country;
	max = new Date(new Date().setDate(new Date().getDate()-1));
	date;
	captcha;
	country_id;
	profile_info;
	countryValidation = false;
  	selectedCountry;
	svg:SafeHtml;
 	captchaText;
	 values = '';
	 emailAlert = false;
	 display: boolean = false;
	 displayNo: boolean = false;
	 emailValue;
	 PopupName: boolean = false;
	 dobFlag: number = 0 ;

  	readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	readonly charValidate = /^[.a-zA-Z ]*$/;
  	readonly nationalValidate = /^(?![0-9]*$)[A-Za-z0-9 ]+$/;
  	readonly passportValidate = /^[a-zA-Z0-9]*$/;
  	readonly postalValidate = /^[a-zA-Z0-9 ]+$/;
  	readonly mobileValidate =/^[0-9]\d{5,12}$/;
	readonly passwordValidate = /^[A-Za-z0-9!@#$%^&*()_]{6,}$/;
	readonly mobilecodeValidate =/[0-9\+\-\ ]/;	
 
  constructor(
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    protected api : ApiService,
    protected countries :CountriesService,
     private dialogService: NbDialogService,
     private messageService: MessageService,
     private toastrService: NbToastrService,
		 private sanitizer: DomSanitizer,
		 private confirmationService: ConfirmationService,
		 private router : Router,
    )
     {  
    this.Countries = this.countries.getData();
    
    }

    ngOnInit() {

      this.buildForm1();     
     
      this.RegisterForm = this.fb.group({
        firstNameCtrl: ['', [ Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70),Validators.minLength(3)]],
       LastNameCtrl: ['', [ Validators.pattern(this.charValidate), Validators.required, Validators.maxLength(70),Validators.minLength(2)]],
        emailCtrl: ['', [ Validators.required, Validators.pattern(this.emailValidate)]], // Validators.pattern("^[0-9]*$")
        passwordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
        repasswordCtrl:['',[Validators.required, Validators.pattern(this.passwordValidate)]],
        AddCtrl:['', [ Validators.required, Validators.maxLength(250),Validators.minLength(3)]],
        genderCtrl: [ '', [ Validators.required]],
        categoryCtrl: [ '', [ Validators.required]],
        CityCtrl:['', [ Validators.pattern(this.charValidate),Validators.required, Validators.maxLength(30),Validators.minLength(2)]],
        StateCtrl:['', [ Validators.pattern(this.charValidate),Validators.required, Validators.maxLength(30),Validators.minLength(2)]],
        PostCodeCtrl:['', [ Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10),Validators.minLength(5)]],
        dobCtrl:['', Validators.required],
        phonecodeCtrl:['',Validators.required],
        phoneCtrl:['', [ Validators.required, Validators.pattern(this.mobileValidate)]],
        CountryCtrl:['', Validators.required],
        CountryOriginCtrl:['', Validators.required],
        captchaCtrl:['', Validators.required],
      });
    }
              
    private buildForm1() : void{
      this.api.getCaptcha()
      .subscribe(
        (data: any) => {  
          this.captchaText = data['data']['captchaText'];
          this.captcha =  data['data']['captchadata'];
          this.svg = this.sanitizer.bypassSecurityTrustHtml(this.captcha);         
        err => console.error(err)
      });
    }
	
		onKeyPress(event: any) {
			this.emailAlert = false;		
			this.api.emailValues(this.RegisterForm.controls.emailCtrl.value)
				.subscribe(
					(data: any) => {
					if(data['status'] == 400){                                    
		
					}else if(data['status'] == 200){
						this.confirmationService.confirm({
							message: 'Your email id is already exists in our database!!! Do you want to login on this website using same id and password??',
							header: 'Confirmation',
							icon: 'pi pi-exclamation-triangle',
							accept: () => {
								this.api.check_in_local_server(this.RegisterForm.controls.emailCtrl.value)
								.subscribe(
									(data: any) => {
										if(data['status'] == 200){
											this.emailAlert = true;
										}else	if(data['status'] == 400){
											this.emailAlert = false;
											this.dialogService.open(ConfirmPassComponent, {
												//hasBackdrop : false,
												//autoFocus : true,
												context: {
												 email: this.RegisterForm.controls.emailCtrl.value,
												},
											 },
											 ).onClose
											.subscribe(
												(name : any) => {
													if(name == 'done'){
														this.display = true;
														this.emailValue = this.RegisterForm.controls.emailCtrl.value;
													}
												}
											)
										}
									}
								)
							},
							reject: () => {
								this.emailValue = this.RegisterForm.controls.emailCtrl.value;
								this.displayNo = true;
							}
						});
					}else{
	
					}       
					err => console.error(err)
				});
		};


    disablestate(country_id){
      this.country_id = country_id;
      if(country_id === 1 ){
        this.RegisterForm.get('StateCtrl').clearValidators();
        this.RegisterForm.get('StateCtrl').updateValueAndValidity();
        document.getElementById('inputState').style.visibility = 'hidden';
        document.getElementById('State').style.visibility = 'hidden';
      }else if(country_id === 154){
        this.RegisterForm.get('StateCtrl').clearValidators();
        this.RegisterForm.get('StateCtrl').updateValueAndValidity();
        this.RegisterForm.get('PostCodeCtrl').clearValidators();
        this.RegisterForm.get('PostCodeCtrl').updateValueAndValidity();
        document.getElementById('inputState').style.visibility = 'hidden';
        document.getElementById('State').style.visibility = 'hidden';
        document.getElementById('inputPremPost').style.visibility = 'hidden';
        document.getElementById('Postal').style.visibility = 'hidden';     
      }else{
		this.RegisterForm.get('StateCtrl').setValidators([Validators.required, Validators.maxLength(30),Validators.minLength(2)]);
		this.RegisterForm.get('StateCtrl').updateValueAndValidity();
		this.RegisterForm.get('PostCodeCtrl').setValidators([ Validators.required, Validators.pattern(this.postalValidate), Validators.maxLength(10),Validators.minLength(5)]);
		this.RegisterForm.get('PostCodeCtrl').updateValueAndValidity();
        document.getElementById('inputState').style.visibility = 'visible';
        document.getElementById('State').style.visibility = 'visible';
        document.getElementById('inputPremPost').style.visibility = 'visible';
        document.getElementById('Postal').style.visibility = 'visible';
      }
	}
	
	ChangeStudentName(){
		this.confirmationService.confirm({
			message: 'You cannot edit Your Name Once Registered.',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				
			}
		});
	}
  	checkcaptcha(duration,status){
		if(!(this.RegisterForm.controls.captchaCtrl.value == this.captchaText)){		
			this.toastrService.show(       
				`checkcaptcha doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "checkcaptcha doesn't match!";
			this.RegisterForm.controls.captchaCtrl.markAsDirty();
			
		}
	}
	reloadcaptcha(){
		this.api.getCaptcha()
		.subscribe(
			(data: any) => {  
				this.captchaText = data['data']['captchaText'];
				this.captcha =  data['data']['captchadata'];
				this.svg = this.sanitizer.bypassSecurityTrustHtml(this.captcha);         
			err => console.error(err)
		});
	}
	checkpassword(duration,status){
		if(this.RegisterForm.controls.passwordCtrl.value != this.RegisterForm.controls.repasswordCtrl.value){		

			this.toastrService.show(       
				`Password doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "Password doesn't match!";
			this.RegisterForm.controls.passwordCtrl.markAsDirty();
		}
	}
    onSubmit(duration,status){
			if(this.RegisterForm.controls.emailCtrl.value != ''){
				this.api.emailValues(this.RegisterForm.controls.emailCtrl.value)
				.subscribe(
					(data: any) => {
					if(data['status'] == 402){                                    
						this.display = true;
						this.emailValue = this.RegisterForm.controls.emailCtrl.value;
					}else if(data['status'] == 200){
						this.confirmationService.confirm({
							message: 'Your email id is already exists in our database!!! Do you want to login on this website using same id and password??',
							header: 'Confirmation',
							icon: 'pi pi-exclamation-triangle',
							accept: () => {
								this.api.check_in_local_server(this.RegisterForm.controls.emailCtrl.value)
								.subscribe(
									(data: any) => {
										if(data['status'] == 200){
											this.emailAlert = true;
										}else	if(data['status'] == 400){
											this.emailAlert = false;
											this.dialogService.open(ConfirmPassComponent, {
												context: {
												email: this.RegisterForm.controls.emailCtrl.value,
												},
											},
											).onClose
											.subscribe(
												(name : any) => {
													if(name == 'done'){
														this.display = true;
														this.emailValue = this.RegisterForm.controls.emailCtrl.value;
													}
												}
											)
										}
									}
								)
							},
							reject: () => {
								//console.log('reject clicked!');
								//todo code for reject
							}
						});
					}else{
	
					}       
					err => console.error(err)
				});
			}
		var check_validation;
    this.RegisterForm.controls.genderCtrl.markAsDirty();     
		this.RegisterForm.controls.emailCtrl.markAsDirty();
		this.RegisterForm.controls.passwordCtrl.markAsDirty();
		this.RegisterForm.controls.repasswordCtrl.markAsDirty();
		this.RegisterForm.controls.firstNameCtrl.markAsDirty();
		this.RegisterForm.controls.LastNameCtrl.markAsDirty();
		this.RegisterForm.controls.categoryCtrl.markAsDirty();
		this.RegisterForm.controls.AddCtrl.markAsDirty();
		this.RegisterForm.controls.CityCtrl.markAsDirty();
		this.RegisterForm.controls.StateCtrl.markAsDirty();
		this.RegisterForm.controls.PostCodeCtrl.markAsDirty();
		 this.RegisterForm.controls.CountryCtrl.markAsDirty();		
		this.RegisterForm.controls.dobCtrl.markAsDirty();    
		this.RegisterForm.controls.phoneCtrl.markAsDirty();
    	this.RegisterForm.controls.phonecodeCtrl.markAsDirty();
   		this.RegisterForm.controls.CountryOriginCtrl.markAsDirty();
    	this.RegisterForm.controls.captchaCtrl.markAsDirty();
		if(this.RegisterForm.controls.passwordCtrl.value == this.RegisterForm.controls.repasswordCtrl.value){
			if(this.RegisterForm.valid){	
				if(this.RegisterForm.controls.captchaCtrl.value == this.captchaText){	
					check_validation = true;
					this.alertflag = 0;
				}else{
					this.reloadcaptcha();
					this.toastrService.show(       
						`checkcaptcha doesn't match ! ! `, {duration},{status}
					  );	
				}			
			}else{			
				this.reloadcaptcha();			
				check_validation = false;
				this.alertflag = 1;
				this.validation_messages =  "Fill in the all required details !";
			}
		}else{
			this.alertflag = 1;
			this.toastrService.show(       
				`Password doesn't match ! ! `, {duration},{status}
      		);
			this.validation_messages =  "Password doesn't match!";
		}
		var difference : any;
      var dobYear : any;
      var currentYear : any;
      dobYear = new Date(this.RegisterForm.controls.dobCtrl.value).getFullYear();
      currentYear = new Date().getFullYear();
			difference = currentYear - dobYear;
      if(difference < 16){
         check_validation = false;
      }
		if(check_validation){
			this.alertflag = 0;
				this.dialogService.open(TermsComponent, {
					closeOnBackdropClick : false,
					context: {
						userName : this.RegisterForm.controls.firstNameCtrl.value,
						Surname: this.RegisterForm.controls.LastNameCtrl.value,
						userPassword : this.RegisterForm.controls.passwordCtrl.value,
						Gender : this.RegisterForm.controls.genderCtrl.value,
						userDob : this.RegisterForm.controls.dobCtrl.value,
						userEmail : this.RegisterForm.controls.emailCtrl.value,
						student_category : this.RegisterForm.controls.categoryCtrl.value,
						userCountryCode : this.RegisterForm.controls.phonecodeCtrl.value,
						userContactNo : this.RegisterForm.controls.phoneCtrl.value,
						userAddress : this.RegisterForm.controls.AddCtrl.value,
						userCity: this.RegisterForm.controls.CityCtrl.value,
						userState : this.RegisterForm.controls.StateCtrl.value,
						postal_code : this.RegisterForm.controls.PostCodeCtrl.value,
						Country:this.RegisterForm.controls.CountryCtrl.value,
						CountryOfOrigin:this.RegisterForm.controls.CountryOriginCtrl.value,
					},
				});
		  }else{
				if(difference < 16){
					this.dobFlag = 1;
				}else{
					this.dobFlag = 0;
				this.alertflag = 1;
				if(this.validation_messages != null){
						this.messages = this.validation_messages;
				}else{
							this.messages = "Your form is not filled please fill completely";
							this.reloadcaptcha();
						}
				}
		  }
     

    }
  
  onClose(){
    this.messgealertflag = 0;
	}

	onEmailClose(){
		this.emailAlert = false;
	}

  close() {
    this.alertflag = 0;
  }
  showResponse(event) {
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
}

onValueChange(event){
  
	var phonecode;
	var permittedValues = this.Countries.map(function(value) {
	  if(value.id == event){
	   phonecode = value.phonecode;
	  }
	 });
	 if(phonecode!=null || phonecode!=undefined ){
	   this.profile_info = phonecode;
	 }
	 
	 
   }
   


}
