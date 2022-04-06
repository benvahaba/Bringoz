import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver.model';
import DriversService from '../services/drivers.service';
import { Task } from '../models/Task.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  zoomLevel: number = 4;

  driverIsFocused: boolean = false;

  lat: number = 0;
  lng: number = 0;
  focusedDriver!: Driver;
  tasks: Task[] = [];

  constructor(private driverService: DriversService) {}

  ngOnInit(): void {
    this.driverService.chosenDriverChanged.subscribe((driver: Driver) => {
      // because at first we don't have a driver
      if (driver !== undefined) {
        this.focusedDriver = driver;
        this.driverIsFocused = true;
        this.lat = driver.location.lat;
        this.lng = driver.location.lng;
        this.tasks = driver.tasks;
        this.zoomLevel = 12;
        console.log(driver);
      } else {
        this.driverIsFocused = false;
        console.log(driver);
        console.log(this.driverIsFocused);
      }
    });
  }
}
