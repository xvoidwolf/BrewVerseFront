import { Component, Input } from '@angular/core';
import { Review } from '../model/review';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
@Input()
review!:Review
}
