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
  bannerImage = '';

  constructor(private route: ActivatedRoute, santizer: DomSanitizer) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.bannerImage = `/data/${city}/${value.event.bannerImage}`;
        this.sponsors = value.sponsors.reduce((acc, s) => {
          if (!acc[s.level]) {
            acc[s.level] = [];
          }
          acc[s.level].push(s);
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
        this.speakers = value.speakers
          .filter(x => this.detail.featureSpeakers.includes(x.id))
          .map(x => ({ ...x, avatar: `/data/${city}/${x.avatar}` }));
        console.log(this.speakers);
        console.log(this.detail);
      }
    });
  }

  ngOnInit() {}
}
