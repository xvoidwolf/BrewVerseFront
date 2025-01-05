import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  saveReview(newReview:Review):Observable<Review> {
    return this.http.post<Review>('http://localhost:8080/api/reviews',newReview);
  }

  getReviews(id:number):Observable<Review[]>{
    return this.http.get<Review[]>(`http://localhost:8080/api/reviews/${id}`)
  }
}
