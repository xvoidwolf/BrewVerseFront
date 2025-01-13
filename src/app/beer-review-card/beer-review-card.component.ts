import { Component, Input } from '@angular/core';
import { BeerReview } from '../model/beer-review';
import { ReviewService } from '../services/review.service';
import { Router } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beer-review-card',
  imports: [FormsModule, RatingModule],
  templateUrl: './beer-review-card.component.html',
  styleUrl: './beer-review-card.component.css'
})
export class BeerReviewCardComponent {
  @Input()
  beerReview!:BeerReview;
  
  constructor(private reviewService:ReviewService, private router:Router){}

  onEdit(){
    this.router.navigate([`edit-review/${this.beerReview.rdto.id}`]);
  }
  onDelete(){
    this.reviewService.deleteReview(this.beerReview.rdto.id).subscribe({
      next:() => {
        alert('La recensione è stata cancellata correttamente!');
        this.router.navigate([`home`]);

      },
      error :(error) => {
        console.log(error);
        alert('La recensione non può essere cancellata.');
      }
    });
  }
}
