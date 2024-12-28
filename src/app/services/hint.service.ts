import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hint } from '../model/hint';

@Injectable({
  providedIn: 'root'
})
export class HintService {
  private baseUrl = 'http://localhost:8080/api/contest';
  
  constructor(private http: HttpClient) { }

  getHintsByWeeklyBeerId(weeklyBeerId: number): Observable<Hint[]> {
    return this.http.get<Hint[]>(`${this.baseUrl}/by-weeklyBeerId/${weeklyBeerId}`);
  }
}
