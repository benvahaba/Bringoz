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
  constructor(private driversService: DriversService) {}

  ngOnInit(): void {
    this.driversService.chosenDriverChanged.subscribe((driverFromService) => {
      driverFromService.id === this.driverId
        ? (this.driverIsFocused = true)
        : (this.driverIsFocused = false);
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
}
