import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../model/beer';
import { WinnerBeer } from '../model/winner-beer';
import { CombinedWinnerBeer } from '../model/combined-winner-beer';
//qui ci saranno le interazione col server per supportare sia il contest che il torneo 
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http:HttpClient) { }
  
  getRandomBeers():Observable<Beer[]> {
    return this.http.get<Beer[]>('http://localhost:8080/api/beers/cardGame');
  }

  saveWinnerBeer(winnerBeer: WinnerBeer):Observable<WinnerBeer> {
    return this.http.post<WinnerBeer>('http://localhost:8080/api/beers/newWinnerBeer', winnerBeer);
  }

  getWinnerBeers():Observable<CombinedWinnerBeer[]> {
    return this.http.get<CombinedWinnerBeer[]>('http://localhost:8080/api/beers/winnerBeers');
  }

}
