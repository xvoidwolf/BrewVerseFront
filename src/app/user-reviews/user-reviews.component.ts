import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ReviewService } from '../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BeerReview } from '../model/beer-review';
import { BeerReviewCardComponent } from '../beer-review-card/beer-review-card.component';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule, CarouselModule, BeerReviewCardComponent],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.css'
})
export class UserReviewsComponent implements OnInit {

  reviews!: BeerReview[];
  userId!: number;
  isLoggedIn:boolean = false;

  constructor(private reviewService: ReviewService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  responsiveOptions: any[] | undefined = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.getReviewsByUserId();

    this.authService.loggedIn$.subscribe({ 
      next: s => this.isLoggedIn = s,
      error: err => console.log(err)
    });
  }

  getReviewsByUserId() {
    this.userId = Number(this.authService.getUserIdFromToken());
    this.reviewService.getReviewsByUserId(this.userId).subscribe({
      next: reviews => {
        this.reviews = reviews;
      },
      error: err => {
        console.log("Errore nel caricamento delle reviews.", err);
      }
    });
  }
}
