import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from './data.service';
import { EventInfo } from './data.model';

@Injectable()
export class DataResolver implements Resolve<EventInfo> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot) {
    console.log('a');
    return this.dataService.getData(route.paramMap.get('city'));
  }
}
