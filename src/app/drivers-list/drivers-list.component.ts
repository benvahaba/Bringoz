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

  constructor(private driversService: DriversService) {
    // just in case the service emmited before thos component created
    this.driversList = this.driversService.getDrivers();
  }

  ngOnInit(): void {
    // we listen to any changes in the drivers list and updating the DOM accordingly
    this.driversService.driversChanged.subscribe((driversFromService) => {
      this.driversList = driversFromService;
    });
  }
  onCardDelete(driverInfo: { driverId: string; driverName: string }) {
    //i made it here just incase in the future ill split the Drivers service to the list of
    //drivers and focused drivers. so in that case the card don't need acces to the entire list
    if (confirm(`Are you sure to delete ${driverInfo.driverName}`)) {
      this.driversService.deleteDriverById(driverInfo.driverId);
    }
  }
}
