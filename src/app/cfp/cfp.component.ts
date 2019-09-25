import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translatezhTW, translateEn } from './translate.lang';
import { Meta } from '@angular/platform-browser';

const TAGS = [
  {
    name: 'description',
    content: 'GDG Taiwan Devfest 2019 Call For Speaker'
  },
  {
    property: 'og:title',
    content: 'GDG Taiwan DEVFEST 2019 CFP'
  }
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
