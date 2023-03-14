import {
  AfterContentInit,
  Component, EventEmitter, OnInit, Output, ViewEncapsulation
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarMonthViewBeforeRenderEvent
} from 'angular-calendar';
import { format } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @Output() onDateChanged= new EventEmitter<string>();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    this.onDateChanged.emit(format((this.viewDate), "yyyy-MM-dd"));
  }

  dayClicked( date: Date ): void {
      this.viewDate = date;
      this.onDateChanged.emit(format((this.viewDate), "yyyy-MM-dd"));
  }

  beforeViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
        if(format((day.date), "yyyy-MM-dd")==format((this.viewDate), "yyyy-MM-dd"))
          day.cssClass = 'bg-grey';
    });
  }
}
