import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  NgZone,
  Optional,
  PLATFORM_ID
} from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import 'firebase/remote-config';
import { BehaviorSubject, concat, forkJoin, Observable, of } from 'rxjs';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EventInfo } from './data.model';

const runInZone = (zone: NgZone) => <T>(obs$: Observable<T>): Observable<T> => {
  return new Observable<T>(subscriber => {
    return obs$.subscribe(
      value => zone.run(() => subscriber.next(value)),
      error => zone.run(() => subscriber.error(error)),
      () => zone.run(() => subscriber.complete())
    );
  });
};

const runOutsideAngular = (zone: NgZone) => <T>(
  obs$: Observable<T>
): Observable<T> => {
  return new Observable<T>(subscriber => {
    return zone.runOutsideAngular(() => {
      runInZone(zone)(obs$).subscribe(subscriber);
    });
  });
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = '';
  app: firebase.app.App;
  remoteConfig: firebase.remoteConfig.RemoteConfig;
  isConnect;
  private config$ = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId,
    @Optional() @Inject('serverUrl') protected serverUrl: string,
    private zone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.app = firebase.initializeApp(environment.firebaseConfig);
      this.remoteConfig = this.app.remoteConfig();
      this.remoteConfig.settings = {
        fetchTimeoutMillis: 3600000,
        minimumFetchIntervalMillis: 3600
      };

      of(this.remoteConfig)
        .pipe(
          switchMap(rc =>
            concat(
              rc.activate().then(() => rc.getAll()),
              rc.fetchAndActivate().then(() => rc.getAll())
            )
          ),
          runOutsideAngular(this.zone)
          // tap(v => console.log(v))
        )
        .subscribe({
          next: value => this.config$.next(value)
        });
    }
  }

  private getDownloadUrl(city) {
    return [
      `https://firebasestorage.googleapis.com/v0/b/angular-sort-url.appspot.com/o/data%2Fzh_events.json?alt=media`,
      `https://firebasestorage.googleapis.com/v0/b/angular-sort-url.appspot.com/o/data%2Fzh_${city}_one_for_all.json?alt=media`
    ];
  }
  getData(city) {
    const ChapterEvent = makeStateKey(`chpater-event-${city}`);
    const store = this.state.get<EventInfo>(ChapterEvent, null);
    // this.baseUrl = `data/${city}/`;
    // const baseUrl = isPlatformBrowser(this.platformId) ? '' : this.serverUrl;

    if (isPlatformServer(this.platformId)) {
      return of(this.getDownloadUrl(city)).pipe(
        concatMap(urls =>
          forkJoin([this.http.get(urls[0]), this.http.get(urls[1])])
        ),
        map((r: any[]) => ({
          event:
            (r[0].devFestEvents as any[]).filter(x => x.tag === city)[0] || {},
          ...r[1]
        })),
        tap(result => this.state.set(ChapterEvent, result))
      );
    }

    if (store) {
      return of(store);
    }

    return this.config$.pipe(
      filter(r => !!r['zh_events'] && !!r[`zh_${city}_one_for_all`]),
      map(r => {
        return {
          event:
            (JSON.parse(r['zh_events'].asString())
              .devFestEvents as any[]).filter(x => x.tag === city)[0] || {},
          ...JSON.parse(r[`zh_${city}_one_for_all`].asString())
        };
      }),
      take(1)
    );

    // return this.http
    // .get<EventInfo>(`${baseUrl}/data/${city}/data.json`)
    // .pipe(tap(result => this.state.set(ChapterEvent, result)));
  }
}
