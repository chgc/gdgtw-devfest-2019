import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { pluck } from 'rxjs/operators';
import { EventInfo, Session, Speaker } from '../data.model';
import { SpeakerDialogComponent } from '../speaker-dialog/speaker-dialog.component';

@Component({
  selector: 'gdg-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  sessions: Session[] = [];
  sessionsByStartTime = {};
  speakers: Speaker[] = [];
  tracks = [];
  city = '';
  startDate;
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.city = this.route.parent.snapshot.paramMap.get('city');
        this.speakers = value.speakers;
        this.startDate = value.sessions[0].session_start_time;
        this.tracks = value.tracks;
        this.sessionsByStartTime = this.parseSession(value);
      }
    });
  }

  private parseSession(value) {
    const tempSessions = value.sessions
      .sort((a, b) => (+a.track_id - +b.track_id > 0 ? 1 : -1))
      .reduce((acc, cur) => {
        const section =
          acc[cur.session_start_time] ||
          new Array(this.tracks.length).fill({ isHidden: true });
        const trackIndex = this.tracks.findIndex(t => t.id === cur.track_id);
        cur.track_name = this.tracks[trackIndex].title;
        cur.isHidden = false;
        section[trackIndex] = cur;
        return { ...acc, [cur.session_start_time]: section };
      }, {});
    Object.keys(tempSessions).forEach(key => {
      let sessions: Session[] = tempSessions[key];
      if (sessions.filter(x => !!x.session_id).length === 1) {
        sessions.forEach(session => {
          session.isOnly = true;
        });
      }
    });
    console.log(tempSessions);
    return tempSessions;
  }

  getSpeaker(speakerId: string) {
    return this.speakers.filter(x =>
      (speakerId || '').split(',').includes(x.speaker_id)
    );
  }

  open(speaker) {
    this.dialog.open(SpeakerDialogComponent, {
      width: '500px',
      data: speaker
    });
  }
  ngOnInit() {}
}
