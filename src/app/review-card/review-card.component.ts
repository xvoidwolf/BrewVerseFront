import { Component, Input} from '@angular/core';
import { Review } from '../model/review';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-card',
  imports: [RatingModule, FormsModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input()
  review!: Review
}
