import { Component, OnInit } from '@angular/core';
import { BeerReview } from '../model/beer-review';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { RatingModule } from 'primeng/rating';
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

  beerReview!: BeerReview;
  updateForm!: FormGroup;
  userId!: number;
  beerId!: number;

  constructor(private authService: AuthService, private beerService: BeerService, private reviewService: ReviewService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.updateForm = this.fb.group({

    });

    this.userId = Number(this.authService.getUserIdFromToken());
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
  
  }

  onSubmit() {
    const review: Review = {
      ...this.updateForm.value,
      userId: this.userId,
      beerId: this.beerId
    }
    console.log(review);
    this.reviewService.updateReview(review.id, review).subscribe({
      next: () => {
        console.log("review inserita");
        this.router.navigate([`user-reviews/${this.userId}`]);
      },
      error: err => {
        alert("Errore nell'inserimento della review. Hai già inserito una recensione per questa birra.");
        this.router.navigate([`user-reviews/${this.userId}`]);
      }
    });
  }
}
