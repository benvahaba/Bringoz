import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { DriversCardComponent } from './drivers-list/drivers-card/drivers-card.component';
import { HttpClientModule } from '@angular/common/http';

import DatabaseService from './services/database.service';
import DriversService from './services/drivers.service';

@NgModule({
  declarations: [AppComponent, DriversListComponent, DriversCardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSIN6e8Wfz37uQVyoS9sdE0mNImoKeZoI',
    }),
  ],
  providers: [DriversService, DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
