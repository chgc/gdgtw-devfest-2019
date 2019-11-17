import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'gdg-speaker-dialog',
  templateUrl: './speaker-dialog.component.html',
  styleUrls: ['./speaker-dialog.component.scss']
})
export class SpeakerDialogComponent implements OnInit {
  speaker: any;
  constructor(
    public dialogRef: MatDialogRef<SpeakerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.speaker = data;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
