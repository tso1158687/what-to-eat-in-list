import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapLocation } from './type/location.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getLocationList():Observable <GoogleMapLocation[]>{
    return this.http.get<GoogleMapLocation[]>('assets/location.json')

  }
}
