import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { pluck } from 'rxjs/operators';
import { EventInfo } from '../data.model';

@Component({
  selector: 'gdg-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.sass']
})
export class SpeakerComponent implements OnInit {
  speakers;

  constructor(private route: ActivatedRoute, santizer: DomSanitizer) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.speakers = value.speakers.map(x => ({
          ...x,
          avatar: `/data/${city}/${x.avatar}`
        }));
        console.log(this.speakers);
      }
    });
  }

  ngOnInit() {}
}
