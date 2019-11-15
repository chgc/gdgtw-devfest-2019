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
  zoom = 15;
  center: google.maps.LatLngLiteral;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 12
  };

  constructor(private route: ActivatedRoute, santizer: DomSanitizer) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.sponsors = value.sponsors.reduce((acc, s) => {
          if (!acc[s.desc]) {
            acc[s.desc] = [];
          }
          acc[s.desc].push(s);
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

        this.center = {
          lat: this.detail.location.lat,
          lng: this.detail.location.lng
        };
      }
    });
  }

  ngOnInit() {}

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
}
