import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({
  selector: 'gdg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devfest2019';
  constructor(
    translate: TranslateService,
    public platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(translate.getBrowserCultureLang());
    if (isPlatformBrowser(this.platformId)) {
      if (this.platform.ANDROID || this.platform.IOS) {
        // this.document.location.href = 'https://devfesttw.page.link/download';
      }
    }
  }
}
