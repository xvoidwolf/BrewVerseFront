import { Component, Input } from '@angular/core';
import { BeerReview } from '../model/beer-review';
import { ReviewService } from '../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer-review-card',
  imports: [],
  templateUrl: './beer-review-card.component.html',
  styleUrl: './beer-review-card.component.css'
})
export class BeerReviewCardComponent {
  @Input()
  beerReview!:BeerReview;

  constructor(private reviewService:ReviewService, private router:Router){}

  onEdit(reviewId:number){
    this.router.navigate([`edit-review/${reviewId}`]);
  }
  onDelete(reviewId:number){
    this.reviewService.deleteReview(reviewId).subscribe({
      next:() => {
        alert('The review was deleted successfully!');
        this.router.navigate([`home`]);

      },
      error :(error) => {
        console.log(error);
        alert('The review could not be deleted!');
      }
    });
  }
}
