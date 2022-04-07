import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import DriversService from 'src/app/services/drivers.service';

@Component({
  selector: 'app-drivers-card',
  templateUrl: './drivers-card.component.html',
  styleUrls: ['./drivers-card.component.css'],
})
export class DriversCardComponent implements OnInit {
  @Input() driverId: string = '';
  @Input() driverName: string = '';
  @Input() imgUrl: string = '';
  @Input() phone: string = '';
  @Input() tasksNum: string = '';
  @Output() delete = new EventEmitter<{
    driverName: string;
    driverId: string;
  }>();
  driverIsFocused: boolean = false;
  constructor(private driversService: DriversService) {
    console.log('at card const');
  }

  ngOnInit(): void {
    //the driver's service is fetching the data before this component is created
    //so in order not to miss the event we init our focused driver
    this.focusedDriverCheckAndUpdate(this.driversService.chosenDriver);
    this.driversService.chosenDriverChanged.subscribe((driver) => {
      this.focusedDriverCheckAndUpdate(driver);
    });
  }
  onCardDelete() {
    this.delete.emit({
      driverName: this.driverName,
      driverId: this.driverId,
    });
  }
  onDriverClicked() {
    this.driversService.setChosenDriver(this.driverId);
  }
  private focusedDriverCheckAndUpdate(driver: Driver | undefined) {
    if (driver === undefined) {
      this.driverIsFocused = false;
      return;
    }
    driver.id === this.driverId
      ? (this.driverIsFocused = true)
      : (this.driverIsFocused = false);
  }
}
