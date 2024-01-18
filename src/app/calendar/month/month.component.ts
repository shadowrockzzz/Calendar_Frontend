import { Component, Input } from '@angular/core';
import { Day } from '../day/day.component';
import { Month } from '../calendar.component';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent {
  calendarRows : any
  calendarCols : any
  nextMonthDaysMissed: number = 0
  dayList : Day[] = []
  @Input('list2D')list2D : Day[][] = [[],[],[],[],[]]
  weekDay = [6,0,1,2,3,4,5]
  weekDaysList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
}
