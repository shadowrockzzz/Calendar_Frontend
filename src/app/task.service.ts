import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  private apiUrl= "http://localhost:3030/api/"

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl+"reservation");
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"reservation", task);
  }
  
  getReservations(task:any) :Observable<any>{
    console.log(this.apiUrl+'dayreservations/'+task)
    return this.http.get(this.apiUrl+'dayreservations/'+task)
  }
}
