import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'food-truck-frotend';
  selectedDate:string="";

  dateChanged(date:string){
    this.selectedDate=date;
  }
}
