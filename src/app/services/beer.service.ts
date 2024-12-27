import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../model/beer';
//qui ci saranno i metodi per le chiamate crud sulle birre e le varie ricerche + recensioni
@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private baseUrl = 'http://localhost:8080/api/beers';

  constructor(private http: HttpClient) { }
  
  getAllBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.baseUrl}/allBeers`);
  }
}
