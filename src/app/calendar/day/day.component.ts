import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {

  @Input('day') day: Day = new Day("")
  @Output('clkEvent') clkEventOutput: EventEmitter<Day> = new EventEmitter<Day>()

  constructor(){
  }

  clkEvent(){
    this.clkEventOutput.next(this.day)
  }
}

export class Day{
  constructor(date: string | null){
    if(date) {
      this.date = new Date(date)
      this.day = this.date.getUTCDay()
      this.isCurrentDay = this.date.getDate() === new Date().getDate() ? true : false
      this.monthlyDate = this.date.getDate()
    }
    else{
      this.date = new Date()
    }
  }

  date : Date = new Date()
  monthlyDate : any = ""
  day: number = this.date.getUTCDay()
  isCurrentDay: boolean = false
  isReserved: boolean = false
  isCurrentMonthDate: boolean = false
}
