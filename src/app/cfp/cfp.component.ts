import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translatezhTW, translateEn } from './translate.lang';

@Component({
  selector: 'gdg-cfp',
  templateUrl: './cfp.component.html',
  styleUrls: ['./cfp.component.scss']
})
export class CfpComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.setLanguage();
  }

  ngOnInit() {}

  private setLanguage() {
    this.translate.setTranslation('en', translateEn);

    this.translate.setTranslation('zh-TW', translatezhTW);
  }
}
