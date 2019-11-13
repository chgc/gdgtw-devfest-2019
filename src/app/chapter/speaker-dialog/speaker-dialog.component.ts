import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Speaker } from '../data.model';

@Component({
  selector: 'gdg-speaker-dialog',
  templateUrl: './speaker-dialog.component.html',
  styleUrls: ['./speaker-dialog.component.sass']
})
export class SpeakerDialogComponent implements OnInit {
  speaker: Speaker;
  constructor(
    public dialogRef: MatDialogRef<SpeakerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(data);
    this.speaker = data;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
