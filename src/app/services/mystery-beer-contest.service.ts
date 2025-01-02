import { Injectable } from '@angular/core';
import { Hint } from '../model/hint';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WeeklyBeer } from '../model/weekly-beer';
import { Answer, AnswerDto } from '../model/answer';

@Injectable({
  providedIn: 'root'
})
export class MysteryBeerContestService {
  private baseUrl = 'http://localhost:8080/api/contest';

  constructor(private http: HttpClient) { }

  getHintsByWeeklyBeerId(weeklyBeerId: number): Observable<Hint[]> {
    return this.http.get<Hint[]>(`${this.baseUrl}/by-weeklyBeerId/${weeklyBeerId}`);
  }
  
  hasUserWon(weeklyBeerId: number, beerId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('weeklyBeerId', `${weeklyBeerId}`)
      .set('beerId', `${beerId}`);
    return this.http.get<boolean>(`${this.baseUrl}/result`, { params });
  }

  getCurrentWeeklyBeer(): Observable<WeeklyBeer> {
    return this.http.get<WeeklyBeer>(`${this.baseUrl}/beerOfTheWeek`);
  }

  createAnswer(answerDto: AnswerDto): Observable<Answer> {
    return this.http.post<Answer>(`${this.baseUrl}/newAnswer`, answerDto);
  }
}
