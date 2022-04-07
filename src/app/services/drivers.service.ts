import DatabaseService from './database.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Driver } from '../models/driver.model';

@Injectable({ providedIn: 'root' })
export default class DriversService {
  //i don't know why but i seems that cant pass the reference to the array so i had to use an emitter
  public drivers: Driver[];
  public driversChanged = new EventEmitter<Driver[]>();

  public chosenDriver?: Driver;
  public chosenDriverChanged = new EventEmitter<Driver>();

  constructor(private databaseService: DatabaseService) {
    this.drivers = [];
    this.getDriversFromDB();
  }
  private getDriversFromDB() {
    this.databaseService.fetchDrivers().subscribe((driversFromDb) => {
      this.drivers = driversFromDb;
      this.driversChanged.emit(this.drivers);

      this.setChosenDriver();
    });
  }
  public deleteDriverById(id: string): void {
    this.drivers = this.drivers.filter((driver) => driver.id !== id);

    //in case user deleted focused driver
    if (this.chosenDriver?.id === id) this.setChosenDriver();

    this.driversChanged.emit(this.drivers);
  }

  public setChosenDriver(id?: string): void {
    if (id !== undefined) {
      // valid driver's id
      this.chosenDriver = this.drivers.find((driver) => driver.id === id);
    } else {
      // in case user deleted current focused driver we will focus on the first driver by default
      // if the list of drivers is empty we will return undefined
      this.drivers.length > 0
        ? (this.chosenDriver = this.drivers[0])
        : (this.chosenDriver = undefined);
    }

    this.chosenDriverChanged.emit(this.chosenDriver);
  }
}
