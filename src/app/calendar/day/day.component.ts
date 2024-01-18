import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {

  @Input('day') day: Day = new Day("")

  constructor(){
    
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
