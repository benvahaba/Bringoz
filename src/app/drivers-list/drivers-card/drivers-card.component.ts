import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/models/driver.model';
import DriversService from 'src/app/services/drivers.service';

@Component({
  selector: 'app-drivers-card',
  templateUrl: './drivers-card.component.html',
  styleUrls: ['./drivers-card.component.css'],
})
export class DriversCardComponent implements OnInit {
  @Input() i_driverId: string = '';
  @Input() i_driverName: string = '';
  @Input() i_imgUrl: string = '';
  @Input() i_phone: string = '';
  @Input() i_tasksNum: string = '';
  @Input() i_email: string = '';
  @Output() delete = new EventEmitter<{
    driverName: string;
    driverId: string;
  }>();
  driverIsFocused: boolean = false;
  isCardEditable: boolean = false;

  editeDriverForm!: FormGroup;
  constructor(private driversService: DriversService) {}

  ngOnInit(): void {
    this.editeDriverForm = new FormGroup({
      driverName: new FormControl(this.i_driverName, [
        Validators.required,
        this.nameValidator.bind(this),
      ]),
      driverPhone: new FormControl(this.i_phone, [Validators.required]),
      driverEmail: new FormControl(this.i_email, [
        Validators.required,
        Validators.email,
      ]),
    });
    //the driver's service is fetching the data before this component is created
    //so in order not to miss the event we init our focused driver
    this.focusedDriverCheckAndUpdate(this.driversService.chosenDriver);
    this.driversService.chosenDriverChanged.subscribe((driver) => {
      this.focusedDriverCheckAndUpdate(driver);
    });
  }
  onCardDelete() {
    this.delete.emit({
      driverName: this.i_driverName,
      driverId: this.i_driverId,
    });
  }
  onDriverClicked() {
    this.driversService.setChosenDriver(this.i_driverId);
  }
  private focusedDriverCheckAndUpdate(driver: Driver | undefined) {
    if (driver === undefined) {
      this.driverIsFocused = false;
      return;
    }
    driver.id === this.i_driverId
      ? (this.driverIsFocused = true)
      : (this.driverIsFocused = false);
  }
  onCardEdite() {
    this.isCardEditable = !this.isCardEditable;
  }
  onFormSubmited() {
    console.log(this.editeDriverForm);
  }
  nameValidator(control: FormControl): { [s: string]: boolean } {
    let regex = '/^[a-zA-Z\\s]*$/';
    if (!(control.value as string).match(regex)) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
