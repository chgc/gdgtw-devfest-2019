import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translatezhTW, translateEn } from './translate.lang';
import { Meta } from '@angular/platform-browser';

const TAGS = [
  {
    name: 'description',
    content: 'GDG DevFest Taiwan 2019 Call For Speaker'
  },
  {
    property: 'og:title',
    content: 'GDG DevFest Taiwan 2019 Call For Speaker'
  },
  {
    property: 'og:description',
    content: '全台最大的 Google 相關技術社群開發者盛會! 歡迎各方高手踴躍投稿。'
  },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:image',
    content: 'https://devfest-tw.appspot.com/assets/fb_cfp.png'
  },
  { property: 'og:url', content: 'https://devfest-tw.appspot.com' }
];

@Component({
  selector: 'gdg-cfp',
  templateUrl: './cfp.component.html',
  styleUrls: ['./cfp.component.scss']
})
export class CfpComponent implements OnInit {
  constructor(private translate: TranslateService, private meta: Meta) {
    TAGS.forEach(tag => this.meta.updateTag(tag));
    this.setLanguage();
  }

  ngOnInit() {}

  private setLanguage() {
    this.translate.setTranslation('en', translateEn);

    this.translate.setTranslation('zh-TW', translatezhTW);
  }
}
