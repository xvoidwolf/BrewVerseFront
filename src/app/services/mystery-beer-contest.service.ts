import { Injectable } from '@angular/core';
import { Hint } from '../model/hint';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WeeklyBeer } from '../model/weekly-beer';
import { Answer, AnswerDto } from '../model/answer';
import { Beer } from '../model/beer';

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
  
  checkIfUserHasVoted(weeklyBeerId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('weeklyBeerId', `${weeklyBeerId}`);
    return this.http.get<boolean>(`${this.baseUrl}/hasVoted` , {params} );
  }
  getAnswerByUserId(userId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.baseUrl}/by-userId/${userId}`);
  }
  getRandomSelectionIncludingWeeklyBeer(weeklyBeerId: number): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.baseUrl}/random-selection/${weeklyBeerId}`);
  }
}
