import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { pluck } from 'rxjs/operators';
import { EventInfo, Team } from '../data.model';

@Component({
  selector: 'gdg-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  teams: { [key: string]: Team[] } = {};
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.teams = value.teams.reduce((acc, cur) => {
          const members = acc[cur.desc] || [];
          members.push(cur);
          return { ...acc, [cur.desc]: members };
        }, {});
        console.log(this.teams);
      }
    });
  }

  ngOnInit() {}
}
