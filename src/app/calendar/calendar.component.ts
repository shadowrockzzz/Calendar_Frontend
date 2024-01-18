import { ChangeDetectorRef, Component } from '@angular/core';
import { Day } from './day/day.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(public cdr: ChangeDetectorRef){
    this.date = new Date()
    this.monthNumber = this.date.getUTCMonth()
    this.yearNumber = this.date.getUTCFullYear()
  }

  date = new Date()
  monthNumber = this.date.getUTCMonth()
  yearNumber = this.date.getUTCFullYear()
  month: Month = new Month(this.monthNumber, this.yearNumber)

  list2D : Day[][] = [[],[],[],[],[]]
  dayList : Day[] = []

  getMonth(month: number) : string{
    let monthArray = ["January","Febrauary","March","April","May","June","July","August","September","October","November","December"]
    return monthArray[month]
  }

  ngOnInit(){
    this.prepareMonthCalendar()
    // this.nextMonthDaysMissed =6-this.dayList[this.dayList.length-1].day
  }

  prevBtnlk(){
    if(this.monthNumber>0){
      this.monthNumber -=1
    }
    else{
      this.monthNumber = 11
      this.yearNumber-=1
    }
    this.month = new Month(this.monthNumber, this.yearNumber)
    this.prepareMonthCalendar()
    this.cdr.detectChanges()
  }

  nextBtnClk(){
    if(this.monthNumber<11){
      this.monthNumber+=1
    }
    else{
      this.monthNumber=0
      this.yearNumber+=1
    }
    this.month = new Month(this.monthNumber, this.yearNumber)
    this.prepareMonthCalendar()
    this.cdr.detectChanges()
  }

  prepareMonthCalendar= ()=>{
    this.list2D = [[],[],[],[],[]]
    if(this.month){
      let monLen = this.month.monthLength
      let j = 0
      for (let i = 1; i<monLen+1; i++){
        const day = new Day(this.month.year+"-"+(this.month.month+1)+"-"+this.get2Digits(i))
        day.isCurrentMonthDate = true
        this.dayList.push(day)
        if(day.day===5){
          this.list2D[j].push(day)
          j+=1
        }
        else{
          if(this.list2D[j]===undefined){
            this.list2D[j] = [day]
          }
          else{
            this.list2D[j].push(day)
          }
        }
      }
      if (this.list2D[this.list2D.length-1].length===0) this.list2D.pop()
      this.ammendList(this.list2D)
    }
    
  }

  ammendList(list2D:Day[][]) {
    let frontAddition = []
    if (list2D[0].length<7){
      for (let i = 0;i<7-list2D[0].length;i++){
        frontAddition.push(new Day("15"))
      }
      list2D[0] = [...frontAddition, ...list2D[0]]
    }
    let extraDays = 7-list2D[list2D.length-1].length

    if(list2D[list2D.length-1].length<7){
      for (let i = 0;i<extraDays;i++){
        list2D[list2D.length-1].push(new Day("15"))
      }
    }
  }

  get2Digits(num: number): string{
    if(num<10) return "0"+num

    return num.toString()
  }

}

export class Month{

  constructor(public month: number, public year: number){
    this.monthLength = new Date(this.year, this.month+1,0).getDate()
  }
  public monthLength: number = 0
}
