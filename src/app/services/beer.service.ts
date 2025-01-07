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

  getBeers(ratingRange: string | undefined, alcoholRange: string | undefined, breweryName: string | undefined, type: string | undefined, pageSize: number, pageNumber: number): Observable<Beer[]> {
    const params: any = {
      // aggiungi anche il name
      // ratingRange: ratingRange,
      // alcoholRange: alcoholRange,
      // breweryName: breweryName,
      type: type, 
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString()
    };
    console.log(params);
    if (type) params.type = type;
    if (breweryName) params.breweryName = breweryName; //ahia.. ti serve l'id qui non il nome
    if (alcoholRange) params.alcoholRange = alcoholRange;
    if (ratingRange) params.ratingRange = ratingRange;
    
    return this.http.get<Beer[]>('http://localhost:8080/api/beers', { params });
  }

  getBeerById(id:number){
  return this.http.get<Beer>(`http://localhost:8080/api/beers/${id}`);
  }
}

