import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { Review } from '../model/review';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-review',
  imports: [ReactiveFormsModule, RatingModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  userId!:number;
  beerId!:number;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private authService:AuthService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("review component ngoninit");
    this.userId = Number(this.authService.getUserIdFromToken());
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(240)]],
      rating: ['', [Validators.required]],
    });
  }
  onSubmit() {
    const review:Review = {
      ...this.reviewForm.value,
      userId: this.userId,
      beerId: this.beerId
    }
    console.log(review);
    this.reviewService.saveReview(review).subscribe({
      next: () => {
        alert("Recensione inserita.");
        this.router.navigate([`details/${this.beerId}`]);
      },
      error: err => {
        alert("Errore nell'inserimento della recensione: " + err);
        this.router.navigate([`details/${this.beerId}`]);
      }
    });
  }
}
