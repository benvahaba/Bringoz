import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';

@Injectable({ providedIn: 'root' })
export default class DatabaseService {
  readonly URL: string = './assets/users.json';

  constructor(private http: HttpClient) {}

  public fetchDrivers() {
    return this.http.get<Driver[]>(this.URL);
  }
}
