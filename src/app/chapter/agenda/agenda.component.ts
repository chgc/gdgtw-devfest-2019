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
  tracks = new Set();
  city = '';
  startDate;
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.city = this.route.parent.snapshot.paramMap.get('city');
        this.speakers = value.speakers;
        this.startDate = value.sessions[0].session_start_time;
        this.tracks = new Set(value.sessions.map(x => x.track_id));
        this.sessionsByStartTime = value.sessions
          .sort((a, b) => (+a.track_id - +b.track_id > 0 ? 1 : -1))
          .reduce((acc, cur) => {
            const section = acc[cur.session_start_time] || [];
            section.push(cur);
            return { ...acc, [cur.session_start_time]: section };
          }, {});
      }
    });
  }

  getSpeaker(speakerIds: number[]) {
    return this.speakers.filter(x => speakerIds.includes(+x.speaker_id));
  }

  ngOnInit() {}
}
