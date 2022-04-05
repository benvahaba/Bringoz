import { Component, OnInit } from '@angular/core';
import { Driver } from '../models/driver.model';
import DatabaseService from '../services/database.service';
import DriversService from '../services/drivers.service';

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css'],
})
export class DriversListComponent implements OnInit {
  private driversList: Driver[];
  constructor(private driversService: DriversService) {
    this.driversList = [];
  }

  ngOnInit(): void {
    this.driversService.onNewDriversFetched.subscribe(
      (driversListFromEvent) => {
        this.driversList = driversListFromEvent;
      }
    );
  }
}
