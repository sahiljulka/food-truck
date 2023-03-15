import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import FoodTruck from '../models/foodtruck';
import { CalendarView } from 'angular-calendar';
import { FoodtruckService } from '../services/foodtruck.service';

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html',
  styleUrls: ['./foodtruck.component.scss'],
})
export class FoodtruckComponent implements OnChanges {
  @Input() selectedDate: string;

  CalendarView = CalendarView;
  foodTrucks: FoodTruck[] = [];
  newFoodTruck = '';
  isLoading = true;

  get viewDate() {
    return new Date(this.selectedDate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.getFoodTrucks();
    }
  }

  constructor(private _foodtruckService: FoodtruckService) {
    this.selectedDate = '';
  }

  getFoodTrucks(): void {
    this.isLoading = true;
    this._foodtruckService
      .getFoodTrucks(this.selectedDate)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data: FoodTruck[]) => {
        this.foodTrucks = data;
      });
  }

  createFoodTruck(foodTruckName: string) {
    this.isLoading = true;
    this._foodtruckService
      .addFoodTruck({
        name: foodTruckName,
        date: this.selectedDate,
      } as FoodTruck)
      .pipe(
        catchError((err)=>{
          this.isLoading = false;
          throw err;
        })
      )
      .subscribe(() => {
        this.getFoodTrucks();
      });
  }

  modifyFoodtruck(foodTruck: FoodTruck, foodTruckName: string) {
    this.isLoading = true;
    if (foodTruck.name != foodTruckName)
      this._foodtruckService
        .modifyFoodTruck({ name: foodTruckName, id: foodTruck.id })
        .pipe(
          catchError((err)=>{
            this.isLoading = false;
            throw err;
          }),
          finalize(()=>{
            this.getFoodTrucks();
          })
        )
        .subscribe();
  }

  deleteFoodtruck(id: number) {
    this.isLoading = true;
    this._foodtruckService.deleteFoodTruck(id)
    .pipe(
      catchError((err)=>{
        this.isLoading = false;
        throw err;
      })
    )
    .subscribe(() => {
      this.getFoodTrucks();
    });
  }
}
