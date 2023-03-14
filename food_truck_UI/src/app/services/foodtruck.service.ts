import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import FoodTruck from '../models/foodtruck';

@Injectable({
  providedIn: 'root',
})
export class FoodtruckService {
  private apiUrl = 'http://localhost:3000/api/v1/foodtruck';
  constructor(private http: HttpClient) {}

  getFoodTrucks(date: string): Observable<FoodTruck[]> {
    return this.http.get<FoodTruck[]>(this.apiUrl + `?date=${date}`);
  }

  addFoodTruck(foodTruck: FoodTruck): Observable<number> {
    return this.http.post<number>(this.apiUrl, foodTruck);
  }

  modifyFoodTruck(foodTruck: FoodTruck): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/${foodTruck.id}`, foodTruck);
  }

  deleteFoodTruck(foodTruckId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/${foodTruckId}`);
  }
}
