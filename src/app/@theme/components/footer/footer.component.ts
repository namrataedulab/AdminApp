import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://admissiondesk.org" target="_blank">Admissiondesk</a></b> 2019</span>
    <div class="socials">
      <a href="https://www.facebook.com/Official-University-of-Mumbai-1592096307699282/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/uni_mumbai?lang=en" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/school/university-of-mumbai?trk=top_nav_home" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
