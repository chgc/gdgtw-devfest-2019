import { Injectable, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { EventInfo } from './data.model';

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
    const ChapterEvent = makeStateKey('chpater-event');
    const store = this.state.get(ChapterEvent, null);
    this.baseUrl = `data/${city}/`;
    if (store) {
      return store;
    }
    const baseUrl = isPlatformBrowser(this.platformId) ? '' : this.serverUrl;
    const data = this.http.get<EventInfo>(`${baseUrl}/data/${city}/data.json`);
    this.state.set(ChapterEvent, data);
    return data;
  }
}
