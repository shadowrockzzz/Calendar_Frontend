import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output('dayClkFunc') dayClkEvent : EventEmitter<Day> = new EventEmitter<Day>()
  weekDay = [6,0,1,2,3,4,5]
  weekDaysList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  clkEventOutput(item: Day){
    this.dayClkEvent.next(item)
  }
}
function output(arg0: string): (target: MonthComponent, propertyKey: "dayClkEvent") => void {
  throw new Error('Function not implemented.');
}

