import DatabaseService from './database.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Driver } from '../models/driver.model';
import { DriverUpdate } from '../models/updatedDriver.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class DriversService {
  //i don't know why but i seems that cant pass the reference to the array so i had to use an emitter
  private drivers: Driver[] = [];
  public driversChanged = new BehaviorSubject<Driver[]>(this.drivers);

  private focusedDriver: Driver;
  public focusedDriverChanged = new BehaviorSubject<Driver>(undefined);

  constructor(private databaseService: DatabaseService) {
    this.drivers = [];
    this.getDriversFromDB();
  }
  private getDriversFromDB() {
    this.databaseService.fetchDrivers().subscribe((driversFromDb) => {
      this.drivers = driversFromDb;

      this.driversChanged.next(this.drivers);
      this.setfocusedDriver();
    });
  }
  public deleteDriverById(id: string): void {
    this.drivers = this.drivers.filter((driver) => driver.id !== id);

    //in case user deleted focused driver
    if (this.focusedDriver?.id === id) this.setfocusedDriver();

    this.driversChanged.next(this.drivers);
  }

  public setfocusedDriver(id?: string): void {
    if (id !== undefined) {
      // valid driver's id
      this.focusedDriver = this.drivers.find((driver) => driver.id === id);
    } else {
      // in case user deleted current focused driver we will focus on the first driver by default
      // if the list of drivers is empty we will return undefined
      this.drivers.length > 0
        ? (this.focusedDriver = this.drivers[0])
        : (this.focusedDriver = undefined);
    }

    this.focusedDriverChanged.next(this.focusedDriver);
  }

  editeDriver(driverUpdate: DriverUpdate) {
    this.drivers = this.drivers.map((driver) => {
      if (driver.id === driverUpdate.id) {
        return { ...driver, ...driverUpdate };
      } else return driver;
    });

    this.driversChanged.next(this.drivers);
    this.setfocusedDriver(driverUpdate.id);
  }
}
