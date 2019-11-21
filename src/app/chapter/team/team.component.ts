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
  teams: { key: string; members: Team[] }[] = [];
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    const city = this.route.parent.snapshot.paramMap.get('city');
    this.route.parent.data.pipe(pluck<any, EventInfo>('data')).subscribe({
      next: value => {
        this.teams = value.teams.reduce((acc, cur) => {
          const group = acc.find(x => x.key === cur.desc) || {
            key: cur.desc,
            members: []
          };
          if (group.members.length === 0) {
            acc.push(group);
          }
          group.members.push(cur);
          return [...acc];
        }, []);
        console.log(this.teams);
      }
    });
  }

  ngOnInit() {}
}
