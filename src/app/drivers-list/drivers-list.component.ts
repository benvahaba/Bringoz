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
    this.driversList = this.driversService.drivers;
  }

  ngOnInit(): void {
    this.driversService.driversChanged.subscribe((driversFromService) => {
      this.driversList = driversFromService;
    });
  }
  onCardDelete(driverInfo: { driverId: string; driverName: string }) {
    if (confirm(`Are you sure to delete ${driverInfo.driverName}`)) {
      this.driversService.deleteDriverById(driverInfo.driverId);
    }
  }
}
