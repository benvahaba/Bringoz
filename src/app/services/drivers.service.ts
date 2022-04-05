import DatabaseService from './database.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Driver } from '../models/driver.model';

@Injectable({ providedIn: 'root' })
export default class DriversService {
  public drivers: Driver[];
  public onNewDriversFetched = new EventEmitter<Driver[]>();
  constructor(private databaseService: DatabaseService) {
    this.drivers = [];
    this.getDriversFromDB();
  }
  private getDriversFromDB() {
    this.databaseService.fetchDrivers().subscribe((driversFromDb) => {
      this.drivers = driversFromDb;
      this.onNewDriversFetched.emit(this.drivers);
    });
  }
}
