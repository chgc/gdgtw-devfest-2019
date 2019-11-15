import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { EventInfo } from './data.model';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = '';
  constructor(
    private http: HttpClient,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId,
    @Optional() @Inject('serverUrl') protected serverUrl: string
  ) {}

  getData(city) {
    this.baseUrl = `data/${city}/`;
    const baseUrl = isPlatformBrowser(this.platformId) ? '' : this.serverUrl;
    const ChapterEvent = makeStateKey(`chpater-event-${city}`);
    const store = this.state.get<EventInfo>(ChapterEvent, null);
    if (store) {
      return of(store);
    }
    return this.http
      .get<EventInfo>(`${baseUrl}/data/${city}/data.json`)
      .pipe(tap(result => this.state.set(ChapterEvent, result)));
  }
}
