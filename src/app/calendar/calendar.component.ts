import { ChangeDetectorRef, Component } from '@angular/core';
import { Month } from './month/month.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(public cdr: ChangeDetectorRef){
    this.date = new Date()
    this.month = this.date.getUTCMonth()
    this.year = this.date.getUTCFullYear()
    this.monthInstance = new Month(this.month,this.year)
  }

  date: Date
  month: number
  year: number
  monthInstance: Month

  getMonth(month: number) : string{
    let monthArray = ["January","Febrauary","March","April","May","June","July","August","September","October","November","December"]
    return monthArray[month]
  }

  prevBtnlk(){
    if(this.month>0){
      this.month -=1
    }
    else{
      this.month = 11
      this.year-=1
    }

    this.monthInstance = new Month(this.month,this.year)
    this.cdr.detectChanges()
    console.log(this.monthInstance)
  }

  nextBtnClk(){
    if(this.month<11){
      this.month+=1
    }
    else{
      this.month=0
      this.year+=1
    }

    this.monthInstance = new Month(this.month,this.year)
    this.cdr.detectChanges()
    console.log(this.monthInstance)
  }

}
