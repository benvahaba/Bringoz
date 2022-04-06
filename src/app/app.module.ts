import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { DriversCardComponent } from './drivers-list/drivers-card/drivers-card.component';
import { HttpClientModule } from '@angular/common/http';

import DatabaseService from './services/database.service';
import DriversService from './services/drivers.service';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [AppComponent, DriversListComponent, DriversCardComponent, MapComponent],
  imports: [
    FormsModule,
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
