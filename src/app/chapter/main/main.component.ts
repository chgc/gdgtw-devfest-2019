import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { EventInfo } from '../data.model';

@Component({
  selector: 'gdg-chapter-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ChapterMainComponent implements OnInit {
  detail;
  speakers;
  sponsors;
  constructor(private route: ActivatedRoute) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    console.log(city);
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.sponsors = value.sponsors.reduce((acc, s) => {
          if (!acc[s.level]) {
            acc[s.level] = [];
          }
          acc[s.level].push(s);
          return acc;
        }, {});
        this.detail = value.event;
        this.speakers = value.speakers
          .filter(x => this.detail.featureSpeakers.includes(x.id))
          .map(x => ({ ...x, avatar: `/data/${city}/${x.avatar}` }));
        console.log(this.sponsors);
        console.log(this.detail);
      }
    });
  }

  ngOnInit() {}
}
