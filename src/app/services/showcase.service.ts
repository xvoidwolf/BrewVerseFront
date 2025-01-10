import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../model/beer';
import { HttpClient } from '@angular/common/http';
//qui ci sarà la roba per la vetrina
@Injectable({
  providedIn: 'root'
})
export class ShowcaseService {

  constructor(private http:HttpClient) { }

  getBeersByMonthlySelectedBrewery(): Observable<Beer[]>{
    return this.http.get<Beer[]>('http://localhost:8080/api/brewery/monthly-brewery');
  }

  // getMonthlySelectedBreweryById(id:number):Observable<any>{
  //   return this.http.get<any>(`http://localhost:8080/api/brewery/monthly-brewery/${id}`);

  // }
}
