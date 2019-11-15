import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { EventInfo } from '../data.model';
import { MatDialog } from '@angular/material/dialog';
import { SpeakerDialogComponent } from '../speaker-dialog/speaker-dialog.component';

@Component({
  selector: 'gdg-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.sass']
})
export class SpeakerComponent implements OnInit {
  speakers;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.speakers = value.speakers;
      }
    });
  }

  open(speaker) {
    this.dialog.open(SpeakerDialogComponent, {
      width: '500px',
      data: speaker
    });
  }

  ngOnInit() {}
}
