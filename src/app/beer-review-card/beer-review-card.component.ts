import { Component, Input } from '@angular/core';
import { BeerReview } from '../model/beer-review';

@Component({
  selector: 'app-beer-review-card',
  imports: [],
  templateUrl: './beer-review-card.component.html',
  styleUrl: './beer-review-card.component.css'
})
export class BeerReviewCardComponent {
  @Input()
  beerReview!:BeerReview;

}
