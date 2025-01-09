import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review';
import { BeerReview } from '../model/beer-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  saveReview(newReview:Review):Observable<Review> {
    return this.http.post<Review>('http://localhost:8080/api/reviews',newReview);
  }

  getReviewsByBeerId(id:number):Observable<Review[]>{
    return this.http.get<Review[]>(`http://localhost:8080/api/reviews/beer/${id}`)
  }

  getReviewsByUserId(id:number):Observable<BeerReview[]>{
    return this.http.get<BeerReview[]>(`http://localhost:8080/api/reviews/user/${id}`)
  }

}
