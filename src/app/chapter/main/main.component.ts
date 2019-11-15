import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, tap } from 'rxjs/operators';
import { EventInfo } from '../data.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'gdg-chapter-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ChapterMainComponent implements OnInit {
  detail;
  speakers;
  sponsors;
  center;

  mapUrl;
  mapLink;

  constructor(private route: ActivatedRoute, santizer: DomSanitizer) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.sponsors = value.sponsors.reduce((acc, s) => {
          if (!acc[s.desc]) {
            acc[s.desc] = [];
          }
          acc[s.desc].push(s);
          return acc;
        }, {});
        this.detail = {
          ...value.event,
          location: {
            ...value.event.location,
            googlemap: santizer.bypassSecurityTrustResourceUrl(
              value.event.location.googlemap
            )
          }
        };
        console.log(this.detail);
        this.center = {
          lat: this.detail.location.lat,
          lng: this.detail.location.lng
        };

        this.speakers = value.speakers.filter(x =>
          this.detail.featureSpeakers.includes(x.speaker_id)
        );

        this.mapUrl = santizer.bypassSecurityTrustResourceUrl(
          `http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${this.center.lat},${this.center.lng}&z=16&output=embed`
        );

        this.mapLink = santizer.bypassSecurityTrustResourceUrl(
          `http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${this.center.lat},${this.center.lng}&z=16`
        );
      }
    });
  }

  ngOnInit() {}

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
}
