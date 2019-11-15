import {
  Inject,
  Injectable,
  NgZone,
  Optional,
  PLATFORM_ID
} from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import * as firebase from 'firebase';
import 'firebase/remote-config';
import { concat, Observable, of } from 'rxjs';
import { shareReplay, switchMap, tap, map, filter } from 'rxjs/operators';
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
  app;
  remoteConfig: firebase.remoteConfig.RemoteConfig;
  isConnect;
  source$;

  constructor(
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId,
    @Optional() @Inject('serverUrl') protected serverUrl: string,
    private zone: NgZone
  ) {
    this.app = firebase.initializeApp(environment.firebaseConfig);
    this.remoteConfig = this.app.remoteConfig();
    this.remoteConfig.settings = {
      fetchTimeoutMillis: 3600000,
      minimumFetchIntervalMillis: 3600000
    };

    this.source$ = of(this.remoteConfig).pipe(
      switchMap(rc =>
        concat(
          rc.activate().then(() => rc.getAll()),
          rc.fetchAndActivate().then(() => rc.getAll())
        )
      ),
      runOutsideAngular(this.zone),
      shareReplay(1)
    );
  }

  getData(city) {
    const ChapterEvent = makeStateKey(`chpater-event-${city}`);
    const store = this.state.get<EventInfo>(ChapterEvent, null);
    if (store) {
      return of(store);
    }
    return this.source$.pipe(
      filter(r => !!r['zh_events'] && !!r[`zh_${city}_one_for_all`]),
      map(r => {
        return {
          event:
            (JSON.parse(r['zh_events'].asString())
              .devFestEvents as any[]).filter(x => x.tag === city)[0] || {},
          ...JSON.parse(r[`zh_${city}_one_for_all`].asString())
        };
      }),
      runOutsideAngular(this.zone),
      shareReplay(1)
    );
  }
}
