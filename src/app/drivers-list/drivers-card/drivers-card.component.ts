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
  //fetching the drivers initial info from the parent (drivers-list)
  @Input() i_driverId: string = '';
  @Input() i_driverName: string = '';
  @Input() i_imgUrl: string = '';
  @Input() i_phone: string = '';
  @Input() i_tasksNum: string = '';
  @Input() i_email: string = '';

  driverIsFocused: boolean = false;
  //controlling the DOM manipulation regarding the buttons we need to display, the edite option and more
  isCardEditable: boolean = false;
  editeDriverForm: FormGroup;
  constructor(private driversService: DriversService) {}

  ngOnInit(): void {
    // creating the form in a reactive driven way
    this.editeDriverForm = new FormGroup({
      name: new FormControl(this.i_driverName, [
        Validators.required,
        this.nameValidator.bind(this),
      ]),
      phone: new FormControl(this.i_phone, [
        Validators.required,
        this.phoneValidator.bind(this),
      ]),
      email: new FormControl(this.i_email, [
        Validators.required,
        Validators.email,
      ]),
    });

    this.driversService.focusedDriverChanged.subscribe((driver) => {
      this.focusedDriverCheckAndUpdate(driver);
    });
  }

  private focusedDriverCheckAndUpdate(driver: Driver) {
    // checkes if the focused driver is this driver and updates it
    if (driver === undefined) {
      this.driverIsFocused = false;
      return;
    }
    driver.id === this.i_driverId
      ? (this.driverIsFocused = true)
      : (this.driverIsFocused = false);
  }

  private resetFormData() {
    //resets the driver to the original driver got from the parent (drivers-list)
    this.editeDriverForm.setValue({
      name: this.i_driverName,
      phone: this.i_phone,
      email: this.i_email,
    });
  }

  ////////// form validations//////////

  //ask liron why it can be private. the DOM controls it or angular
  private nameValidator(control: FormControl): { [s: string]: boolean } {
    let regex = '^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$';
    if (!(control.value as string).match(regex)) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  private phoneValidator(control: FormControl): { [s: string]: boolean } {
    //only fits the pattren n-nnn-nnn-nnnn
    let regex = '^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$';
    if (!(control.value as string).match(regex)) {
      return { phoneIsForbidden: true };
    }
    return null;
  }

  ////////// click events//////////
  public onCardDelete() {
    //passing to (drivers-list) component
    if (confirm(`Are you sure to delete ${this.i_driverName}`)) {
      this.driversService.deleteDriverById(this.i_driverId);
    }
  }
  public onDriverClicked() {
    //is that a bug or a feature? i don't know. i wanted to give the user the option to
    //update other drivers while still focusing on the old one
    if (!this.isCardEditable)
      this.driversService.setfocusedDriver(this.i_driverId);
  }

  public onCardEdite() {
    this.isCardEditable = !this.isCardEditable;
    //if user clicked again on edite aka canceled it
    if (!this.isCardEditable) this.resetFormData();
  }
  public onDriverFormSubmited() {
    if (
      this.editeDriverForm.status === 'VALID' &&
      this.editeDriverForm.touched == true
    ) {
      this.driversService.editeDriver({
        id: this.i_driverId,
        ...this.editeDriverForm.value,
      });
    }
  }
  public onCancelClicked() {
    this.resetFormData();
    this.isCardEditable = false;
  }
}
