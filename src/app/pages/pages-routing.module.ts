import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { CartComponent } from './cart/cart.component';
import { ApplicationComponent } from './application/application.component';
import { CollegeinfoComponent } from './collegeinfo/collegeinfo.component';
import { SettingsComponent } from './settings/settings.component';
import { SelectCollegeComponent } from './selectcollege/selectcollege.component';
import { CourseComponent } from './course/course.component';
import { ApplicationStepsComponent } from './application/applicationsteps/applicationsteps.component';
import { PreferencesComponent } from './cart/preference/preferences.component';
import { SecondCancelComponent } from './paymentrequests/SecondCancel.component';
import { SecondFailureComponent } from './paymentrequests/SecondFailure.component';
import { ThirdCancelComponent } from './paymentrequests/ThirdCancel.component';
import { ThirdFailureComponent } from './paymentrequests/ThirdFailure.component';
import { searchCourseComponent } from './course/searchCourse/searchCourse.component';
import { FirstSuccessComponent } from './paymentrequests/FirstSuccess.component';
import { SecondSuccessComponent } from './paymentrequests/SecondSuccess.component';
import { ThirdSuccessComponent } from './paymentrequests/ThirdSuccess.component';
import { FirstCancelComponent } from './paymentrequests/FirstCancel.component';
import { FirstFailureComponent } from './paymentrequests/FirstFailure.component';
import { HelpComponent } from './help/help.component';
import { ViewTicketComponent } from './help/viewTicket/viewTicket.component';
import { PeersComponent } from './peers/peers.component';
import { ChatComponent } from './chat/chat.component';
import { CartpaymentComponent } from './cartpayment/cartpayment.component';
import { AdminApplicationComponent } from '../admin/application/application.component';
import { AdminEligibilityComponent } from '../admin/eligibility/eligibility.component';
import { AdminViewComponent } from '../admin/view/view.component';
import { AdminErrataComponent } from '../admin/errata/errata.component';
import { StudentManagementComponent } from '../admin/student-management/student-management.component';
import { AdminForeignOfficeComponent } from '../admin/foreign_office/foreignoffice.component';
import { AdminReuploadedTranscriptComponent } from '../admin/re_Uploaded_Transcript/re_Uploaded_Transcript.component';
import { AdminDownloadComponent } from '../admin/download/download.component';
import { AdminReportComponent } from '../admin/report/report.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';
import { InstituteManagementComponent } from '../admin/institute-management/institute-management.component';
import { ViewInstituteComponent } from '../admin/view-institute/view-institute.component';
import { SplitPaymentComponent } from '../admin/split-payment/split-payment.component';
//Institute
import { CourseListComponent } from "./../institute/course-list/course-list.component";
import { CourseManagementComponent } from '../institute/course-list/course-management/course-management.component';
import { InstituteApplicationComponent } from './../institute/institute-application/institute-application.component';
import { CollegeManagementComponent } from '../institute/college-management/college-management.component';
import { InstituteDashboardComponent } from '../institute/institute-dashboard/institute-dashboard.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },{
    path: 'profile',
    component: ProfileComponent,
  }, 
  {
    path: 'search',
    component: SearchComponent,
  },
   {
    path: 'application',
    component: ApplicationComponent ,
  },
  {
    path: 'application/process',
    component: ApplicationStepsComponent,
  },
  {
    path: 'FirstSuccess',
    component: FirstSuccessComponent,
  }, 
  {
    path: 'SecondSuccess',
    component: SecondSuccessComponent,
  }, 
  {
    path: 'ThirdSuccess',
    component: ThirdSuccessComponent,
  }, 
  {
    path : 'FirstCancel',
    component : FirstCancelComponent,
  },
  {
    path: 'SecondCancel',
    component: SecondCancelComponent,
  },
  {
    path: 'ThirdCancel',
    component: ThirdCancelComponent,
  },
  {
    path: 'ThirdFailure',
    component: ThirdFailureComponent,
  },
  {
    path: 'SecondFailure',
    component: SecondFailureComponent,
  },
  {
    path: 'FirstFailure',
    component: FirstFailureComponent,
  },
  {
    path: 'downloads',
    component: DownloadsComponent,
  }, {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'cartpayment',
    component: CartpaymentComponent,
  },
  {
    path: 'preferences',
    component:PreferencesComponent,
  },
  {
    path: 'college',
    component: CollegeinfoComponent,
  },
  {
    path: 'course',
    component: CourseComponent,
  },
  {
    path: 'search/course',
    component: searchCourseComponent,
  },  
  {
    path: 'selectcollege',
    component: SelectCollegeComponent,
  },
  {
    path: 'peers',
    component: PeersComponent,
  }, 
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'viewTicket',
    component: ViewTicketComponent,
  },
   {
    path: 'settings',
    component: SettingsComponent,
  },
   /*Admin Components*/
   {
    path: 'studentManagement',
    component: StudentManagementComponent,

  }, 
   {
    path: 'adminApplication',
    component: AdminApplicationComponent,

  },
  {
    path: 'adminEligibility',
    component: AdminEligibilityComponent,

  }, 
  {
    path: 'adminView',
    component: AdminViewComponent,

  }, 
  {
    path: 'adminErrata',
    component: AdminErrataComponent,

  }, 
  {
    path: 'adminForeignOffice',
    component: AdminForeignOfficeComponent,

  }, 
  {
    path: 'AdminReuploadedTranscript',
    component: AdminReuploadedTranscriptComponent,

  },
  {
    path: 'AdminDownload',
    component: AdminDownloadComponent,

  },
  {
    path: 'AdminReport',
    component: AdminReportComponent,

},
{
  path: 'adminDashboard',
  component: AdminDashboardComponent,

},
{
  path: 'adminInstitute',
  component: InstituteManagementComponent,

},
{
  path: 'adminInstituteView',
  component: ViewInstituteComponent,

},
{
  path: 'adminPayment',
  component: SplitPaymentComponent,
},
/*INSTITUTE Components*/
{
  path: 'InstituteDashboard',
  component: InstituteDashboardComponent,

},
{
  path: 'college-management',
  component: CollegeManagementComponent,

},
{
  path: 'course-list',
  component: CourseListComponent,

},
{
  path: 'course-management',
  component: CourseManagementComponent,

},
{
  path: 'institute-application',
  component: InstituteApplicationComponent,

},

  
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
