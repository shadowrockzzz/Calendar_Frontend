import { Component, Input } from '@angular/core';
import { Day } from '../day/day.component';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent {
  @Input('month') month ?: Month
  calendarRows : any
  calendarCols : any
  nextMonthDaysMissed: number = 0
  dayList : Day[] = []
  list2D : Day[][] = [[],[],[],[],[]]
  weekDay = [6,0,1,2,3,4,5]

  ngOnInit(){
    console.log(this.month)
    if (this.month){
      this.calendarRows = Array(Math.ceil(this.month.monthLength/7)).fill(null).map((index)=>index+1)
      this.calendarCols = Array(7).fill(null).map((index)=>index+1)
      this.prepareMonthCalendar()
      this.nextMonthDaysMissed =6-this.dayList[this.dayList.length-1].day
    }
    
  }

  weekDaysList = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  prepareMonthCalendar= ()=>{
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

  // addFirstDays = (dayList: Day[]) : Day[]=>{
  //   if(dayList.length>0){
  //     let daysMissed: number = ((dayList[0].day)+1)%7
  //     let missedDays: Day[] = []
  //     let previousMonthLength = 0
  //     console.log(daysMissed)
  //     if (this.month.month>0){
  //       previousMonthLength = new Date(this.month.year, this.month.month-1,0).getDate()
  //       for ( let j = daysMissed-1;j>=0;j--){
  //         missedDays.push(new Day(this.month.year+"-"+(this.month.month)+"-"+this.get2Digits(previousMonthLength-j)))
  //       }
  //     }
  //     else{
  //       previousMonthLength = new Date(this.month.year-1, 12,0).getDate()
  //       for ( let j = daysMissed-1;j>=0;j--){
  //         missedDays.push(new Day(this.month.year-1+"-"+12+"-"+this.get2Digits(previousMonthLength-j)))
  //       }
  //     }

  //     return missedDays
  //   }
  //   return []
  // }

  // addLastDays(dayList: Day[]) : Day[]{
  //   if(dayList.length>0){
  //     let missedDays: Day[] = []
  //     let nextMonthLength = 0
  //     if(this.month.month<11){
  //       nextMonthLength = new Date(this.month.year,this.month.month+2,0).getDate()
  //       let missed = 6-dayList[dayList.length-1].day
  //       for ( let j = 1;j<missed;j++){
  //         missedDays.push(new Day(this.month.year+"-"+(this.month.month+2)+"-"+this.get2Digits(j)))
  //       }
  //     }
  //     else{
  //       nextMonthLength = new Date(this.month.year+1,0,0).getDate()
  //       let missed = 6-dayList[dayList.length-1].day
  //       for ( let j = 1;j<=missed;j++){
  //         missedDays.push(new Day((this.month.year+1)+"-"+"01"+"-"+this.get2Digits(j)))
  //       }
  //       console.log("Hi")
  //     }
  //     return missedDays
  //   }

  //   return []

  // }

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
