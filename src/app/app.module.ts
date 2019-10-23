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

const routes: Routes = [
  { path: 'cfp', component: CfpComponent },
  {
    path: ':city',
    component: LayoutComponent,
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
    MainComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    TranslateModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
