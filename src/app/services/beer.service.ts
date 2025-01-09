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

  getBeers(beerName: string | null, ratingRange: string | null, alcoholRange: string | null, breweryId: number | null,
     type: string | null, pageSize: number, pageNumber: number): Observable<Beer[]> {
    const params: any = {
      pageSize: pageSize.toString(),
      pageNumber: pageNumber.toString()
    };
    if (beerName) params.beerName = beerName;
    if (breweryId) params.breweryId = breweryId; 
    if (type) params.type = type;
    if (alcoholRange) params.alcoholRange = alcoholRange;
    if (ratingRange) params.ratingRange = ratingRange;
    console.log(params);
    return this.http.get<Beer[]>('http://localhost:8080/api/beers', { params });
  }
  createBeer(beer: Beer): Observable<Beer> {
    return this.http.post<Beer>(`${this.baseUrl}`, beer);
  }
  deleteBeer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateBeer(id: number, beer: Beer): Observable<Beer> {
    return this.http.post<Beer>(`${this.baseUrl}/${id}`, beer);
  }

  getBeerById(id:number){
  return this.http.get<Beer>(`http://localhost:8080/api/beers/${id}`);
  }

  getBeerTypes(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/beers/beer-types');
  }
  getBeerNames(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/beers/beer-names');
  }
  getBreweries(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>('http://localhost:8080/api/beers/breweries');
  }

}