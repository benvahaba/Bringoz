import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver.model';
import DriversService from '../services/drivers.service';
import { Location } from '../models/Location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  readonly FOCUSED_ZOOM = 12;
  readonly UNFOCUSED_ZOOM = 4;
  zoomLevel: number = this.UNFOCUSED_ZOOM;
  driverIsFocused: boolean = false;

  //we must declare a location. AGM demends
  location: Location = { lat: 0, lng: 0 };

  focusedDriver: Driver;

  constructor(private driverService: DriversService) {}

  ngOnInit(): void {
    this.driverService.focusedDriverChanged.subscribe((driver: Driver) => {
      // because at first we don't have a driver
      if (driver !== undefined) {
        this.focusedDriver = driver;
        this.driverIsFocused = true;
        this.location = driver.location;
        this.zoomLevel = this.FOCUSED_ZOOM;
      } else {
        this.driverIsFocused = false;
      }
    });
  }
}
