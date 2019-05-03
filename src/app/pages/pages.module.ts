import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchModule } from './search/search.module';
import { ProfileModule } from "./profile/profile.module";
import { DownloadsModule } from "./downloads/downloads.module";
import { ApplicationModule } from "./application/application.module";
import { CartModule } from "./cart/cart.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CollegeinfoModule } from './collegeinfo/collegeinfo.module';
import { SettingsComponent } from './settings/settings.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { SelectCollegeModule } from "./selectcollege/selectcollege.module";
import { CourseModule } from "./course/course.module";
import { ApplicationStepsModule } from "./application/applicationsteps/applicationsteps.module";
import { PreferencesModule } from './cart/preference/preferences.module';
import { FirstCancelModule } from "./paymentrequests/FirstCancel.module";
import { SecondCancelModule } from "./paymentrequests/SecondCancel.module";
import { ThirdCancelModule } from "./paymentrequests/ThirdCancel.module";
import { FirstFailureModule } from "./paymentrequests/FirstFailure.module";
import { SecondFailureModule } from "./paymentrequests/SecondFailure.module";
import { ThirdFailureModule } from "./paymentrequests/ThirdFailure.module";
import { searchCourseModule } from "./course/searchCourse/searchCourse.module";
import { FirstSuccessModule } from "./paymentrequests/FirstSuccess.module";
import { SecondSuccessModule } from "./paymentrequests/SecondSuccess.module";
import { ThirdSuccessModule } from "./paymentrequests/ThirdSuccess.module";
import { HelpModule } from "./help/help.module";
import { Data } from "../shared/data";
import { PeerModule } from "./peers/peers.module";
import { CartpaymentModule } from "./cartpayment/cartpayment.module";
import { AdminApplicationModule } from "../admin/application/application.module";
import { AdminEligibilityModule } from "../admin/eligibility/eligibility.module";
import { AdminViewModule } from '../admin/view/view.module';
import { AdminErrataModule } from '../admin/errata/errata.module';
import { StudentMgmtModule } from '../admin/student-management/student-management.module';
import { AdminForeignOfficeModule } from '../admin/foreign_office/foreignoffice.module';
import { AdminReuploadedTranscriptModule } from '../admin/re_Uploaded_Transcript/re_Uploaded_Transcript.module';
import { AdminDownloadModule } from '../admin/download/download.module';
import { AdminReportModule } from '../admin/report/report.module';
import { AdminDashboardModule } from '../admin/admin-dashboard/admin-dashboard.module';
import { InstituteManagementModule } from '../admin/institute-management/institute-management.module';
import { ViewInstituteModule } from '../admin/view-institute/view-institute.module';
import { SplitPaymentModule } from '../admin/split-payment/split-payment.module';
//institute
import { InstituteApplicationModule } from "../institute/institute-application/institute-application.module";
import { CourseListModule } from "../institute/course-list/course-list.module";
import { CourseManagementModule } from '../institute/course-list/course-management/course-management.module';
import { CollegeManagementModule } from '../institute/college-management/college-management.module';
import { InstituteDashboardModule } from '../institute/institute-dashboard/institute-dashboard.module';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    SearchModule,
    DashboardModule,
    MiscellaneousModule,
    ProfileModule,
    DownloadsModule,
    CartModule,
    ApplicationModule,
    CollegeinfoModule,
    NgxUploaderModule,
    SelectCollegeModule,
    CourseModule,
    ApplicationStepsModule,
    SecondCancelModule,
    SecondFailureModule,
    ThirdCancelModule,
    ThirdFailureModule,
    PreferencesModule,
    searchCourseModule,
    FirstSuccessModule,
    FirstCancelModule,
    FirstFailureModule,
    SecondSuccessModule,
    ThirdSuccessModule,
    HelpModule,
    PeerModule,
    CartpaymentModule,
    /*########### Admin Modules ############*/
    AdminApplicationModule,
    AdminEligibilityModule,
    AdminViewModule,
    AdminErrataModule,
    StudentMgmtModule,
    AdminForeignOfficeModule,
    AdminReuploadedTranscriptModule,
    AdminDownloadModule,
    AdminReportModule,
    AdminDashboardModule,
    InstituteManagementModule,
    ViewInstituteModule,
    SplitPaymentModule,
  /*########### Institute Modules ############*/
    InstituteDashboardModule,
    InstituteApplicationModule,
    CourseListModule,
    CourseManagementModule,
    CourseModule,
    CollegeManagementModule

  ],
  providers: [Data],
  declarations: [
    ...PAGES_COMPONENTS,
    SettingsComponent,
  ],
  exports: [
    NgxUploaderModule,
  ],
})
export class PagesModule {
}
