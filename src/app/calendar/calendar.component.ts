import { ChangeDetectorRef, Component } from '@angular/core';
import { Day } from './day/day.component';
import { TaskService } from '../task.service';
import {NgForm} from '@angular/forms';
import { StripeService } from '../stripe.service';
import { v4} from 'uuid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  mode = 'calendar'

  formData = {
    name: '',
    phone: '',
    email: ''
  }

  storeData = {
    date: '',
    time: '',
    name: '',
    phone: '',
    email: ''
  }
  constructor(public cdr: ChangeDetectorRef, private taskService: TaskService,  private stripeService: StripeService){
    this.date = new Date()
    this.monthNumber = this.date.getUTCMonth()
    this.yearNumber = this.date.getUTCFullYear()
    taskService.getTasks().subscribe((data)=>{
      console.log(data)
    })
  }

  onFormSubmit(){
    this.storeData.name = this.formData.name
    this.storeData.email = this.formData.email
    this.storeData.phone = this.formData.phone
    this.formData.name=""
    this.formData.phone=""
    this.formData.email=""
    this.mode="buffering"
    this.taskService.addTask(this.storeData).subscribe((res)=>{
        console.log(res)
      })
    this.stripeService.checkout().then((data)=>{
      console.log(data)
    });
  }

  date = new Date()
  monthNumber = this.date.getUTCMonth()
  yearNumber = this.date.getUTCFullYear()
  month: Month = new Month(this.monthNumber, this.yearNumber)

  list2D : Day[][] = [[],[],[],[],[]]
  dayList : Day[] = []
  hours = [{time:"9:00", isReserved:false},{time:"11:00", isReserved:false},{time:"13:00", isReserved:false},{time:"15:00", isReserved:false},{time:"17:00", isReserved:false}]

  tasks: any

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  resetHours(){
    for(let i in this.hours){
      this.hours[i].isReserved = false
    }
  }

  getMonth(month: number) : string{
    let monthArray = ["January","Febrauary","March","April","May","June","July","August","September","October","November","December"]
    return monthArray[month]
  }

  dayClickEvent(item: Day){
    this.storeData.date = item.date.getDate() + "-"+(item.date.getMonth()+1)+"-"+item.date.getFullYear()
    console.log(this.storeData.date)
    this.taskService.getReservations(this.storeData.date).subscribe((data:any)=>{
      for (let i in data){
        for (let hour of this.hours){
          if(data[i].time===hour.time){
            hour.isReserved = true
          }
        }
      }
    })
    this.mode = "time"
    this.resetHours()
  }

  backBtnClk(){
    if(this.mode==="form"){
      this.mode = "time"
    }
    else if(this.mode==="time"){
      this.mode = "calendar"
    }
  }

  timeSelectEvent(item : any, hour:any){
    if(!hour.isReserved){
      this.storeData.time = item.srcElement.innerText
      this.mode = "form"
    }
  }

  ngOnInit(){
    this.prepareMonthCalendar()
    this.loadTasks()
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
    console.log(this.tasks)
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

export enum userDate {
  date,
  time,
  name,
  phone,
  email
}
