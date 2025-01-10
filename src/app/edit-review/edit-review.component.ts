import { Component, OnInit } from '@angular/core';
import { BeerReview } from '../model/beer-review';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { Rating, RatingModule } from 'primeng/rating';
import { Review } from '../model/review';
import { AuthService } from '../services/auth.service';
import { BeerService } from '../services/beer.service';

@Component({
  selector: 'app-edit-review',
  imports: [ReactiveFormsModule, RatingModule],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.css'
})
export class EditReviewComponent implements OnInit {

  review!: Review;
  updateForm!: FormGroup;

  constructor(private authService: AuthService, private beerService: BeerService, private reviewService: ReviewService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      rating:['', []],
      description:['', []]
    });
    const reviewId = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewById(reviewId).subscribe({
      next: r => {
        this.review=r;
        this.updateForm.patchValue(this.review);
      },
      error: err => alert("review not found")
      
    });  
  }

  onSubmit() {
    const updatedReview: Review = {
      ...this.updateForm.value,
      userId: this.review.userId,
      beerId: this.review.beerId,
      id:this.review.id
    }
    this.reviewService.updateReview(updatedReview.id, updatedReview).subscribe({
      next: () => {
        alert("review aggiornata");
        this.router.navigate([`user-reviews/${this.review.userId}`]);
      },
      error: err => {
        alert("Errore nell'aggiornamento della review. Hai già inserito una recensione per questa birra.");
        this.router.navigate([`user-reviews/${this.review.userId}`]);
      }
    });
  }
}
