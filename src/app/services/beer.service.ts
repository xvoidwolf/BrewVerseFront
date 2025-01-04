import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../model/beer';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http:HttpClient) { }

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
}