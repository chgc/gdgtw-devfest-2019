import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CfpComponent } from './cfp/cfp.component';

@NgModule({
  declarations: [AppComponent, CfpComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
