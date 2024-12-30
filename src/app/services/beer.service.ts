import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../model/beer';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http:HttpClient) { }

  getBeers(ratingRange: any, alcoholRange: any, breweryId: any, type: string | undefined, pageSize: number, pageNumber: number):Observable<Beer[]> {
    return this.http.get<Beer[]>('http://localhost:8080/api/beers');
  } 
}




