import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { pluck } from 'rxjs/operators';
import { EventInfo, Session, Speaker } from '../data.model';

@Component({
  selector: 'gdg-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  sessions: Session[] = [];
  sessionsByStartTime = {};
  speakers: Speaker[] = [];
  city = '';
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.city = this.route.parent.snapshot.paramMap.get('city');
        this.speakers = value.speakers;
        this.sessionsByStartTime = value.sessions.reduce((acc, cur) => {
          const section = acc[cur.startTime] || [];
          section.push(cur);
          return { ...acc, [cur.startTime]: section };
        }, {});
        console.log(this.sessionsByStartTime);
      }
    });
  }

  getSpeaker(speakerIds: number[]) {
    return this.speakers
      .filter(x => speakerIds.includes(x.id))
      .map(x => ({
        ...x,
        avatar: `/data/${this.city}/${x.avatar}`
      }));
  }

  ngOnInit() {}
}
