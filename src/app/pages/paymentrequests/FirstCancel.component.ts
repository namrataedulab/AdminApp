
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'firstcancel',
  //styleUrls: ['./application.component.scss'],
  template: `<div class="row">
    <div class="col-xxxl-8 col-xxl-8 col-lg-7 col-md-8">
      <nb-card status="success">
        <nb-card-header>
          <h1>PAYMENT CANCELLED</h1>
        </nb-card-header>
        <nb-card-body>
          <h4>Please Try again, Your Course is added in Cart.<br> <a [routerLink]="['/pages/cart']">Click here</a>, To Go in Cart</h4><br>
          <a href="" ng-click="redirect()">Click here</a>
           To Go Back
        </nb-card-body>
      </nb-card>
    </div>
  </div>`,
})
export class FirstCancelComponent  {
  
  constructor(private router: Router) {

  }
  async ngOnInit() {


  }

  redirect(){
    this.router.navigateByUrl('/pages/dashboard');
  }

  

  
  

}

