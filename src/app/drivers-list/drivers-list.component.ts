import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver.model';
import DriversService from '../services/drivers.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css'],
})
export class DriversListComponent implements OnInit {
  driversList: Driver[];

  constructor(private driversService: DriversService) {}

  ngOnInit(): void {
    // we listen to any changes in the drivers list and updating the DOM accordingly
    this.driversService.driversChanged.subscribe((driversFromService) => {
      this.driversList = driversFromService;
    });
  }
}
