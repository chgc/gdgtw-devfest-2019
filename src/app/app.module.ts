import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CfpComponent } from './cfp/cfp.component';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './chapter/layout/layout.component';
import { ChapterMainComponent } from './chapter/main/main.component';
import { AgendaComponent } from './chapter/agenda/agenda.component';
import { SpeakerComponent } from './chapter/speaker/speaker.component';
import { SponsorComponent } from './chapter/sponsor/sponsor.component';
import { TeamComponent } from './chapter/team/team.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { DataResolver } from './chapter/data-resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpeakerDialogComponent } from './chapter/speaker-dialog/speaker-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: 'cfp', component: CfpComponent },
  {
    path: ':city',
    component: LayoutComponent,
    resolve: { data: DataResolver },
    children: [
      { path: '', component: ChapterMainComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'speaker', component: SpeakerComponent },
      { path: 'sponsor', component: SponsorComponent },
      { path: 'team', component: TeamComponent }
    ]
  },
  { path: '', component: MainComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CfpComponent,
    LayoutComponent,
    ChapterMainComponent,
    AgendaComponent,
    SpeakerComponent,
    SponsorComponent,
    TeamComponent,
    MainComponent,
    SpeakerDialogComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled'
    }),
    TranslateModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [DataResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
