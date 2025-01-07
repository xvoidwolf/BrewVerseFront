import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  userId!:number;
  beerId!:number;

  constructor(private fb: FormBuilder, private reviewService: ReviewService, private authService:AuthService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = Number(this.authService.getUserIdFromToken());
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(240)]],
      rating: ['', [Validators.required]],
      userId: this.userId,
      beerId: this.beerId
    });
    console.log(this.userId,this.beerId);
  }
  onSubmit() {
    
    this.reviewService.saveReview(this.reviewForm.value).subscribe({
      next: () => {
        console.log("review inserita");
      },
      error: err => {
        console.log("errore nell'inserimento della review", err);
      }
    });
  }
}
