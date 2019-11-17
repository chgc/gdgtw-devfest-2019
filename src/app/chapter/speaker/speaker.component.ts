import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { EventInfo, Session, Track } from '../data.model';
import { MatDialog } from '@angular/material/dialog';
import { SpeakerDialogComponent } from '../speaker-dialog/speaker-dialog.component';

@Component({
  selector: 'gdg-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.sass']
})
export class SpeakerComponent implements OnInit {
  speakers;
  sessions: Session[];
  tracks: Track[];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.speakers = value.speakers;
        this.sessions = value.sessions;
        this.tracks = value.tracks;
      }
    });
  }

  open(speaker) {
    const session = this.sessions.filter(
      x => x.speaker_id === speaker.speaker_id
    )[0];
    const track = this.tracks.filter(x => x.id === session.track_id)[0];
    this.dialog.open(SpeakerDialogComponent, {
      width: '700px',
      data: { ...speaker, ...session, track }
    });
  }

  ngOnInit() {}
}
