import { Component } from '@angular/core';
import { Review } from '../model/review';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ReviewService } from '../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-reviews',
  imports: [CommonModule,CarouselModule,ReviewCardComponent],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.css'
})
export class UserReviewsComponent {

  reviews!:Review[];
  userId!:number;

  constructor(private reviewService: ReviewService, private authService: AuthService,  private router: Router, private route: ActivatedRoute) { }

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

    getReviewsByUserId() {
      this.userId = Number(this.authService.getUserIdFromToken());
      this.reviewService.getReviewsByUserId(this.userId).subscribe({
        next: reviews => {
          this.reviews = reviews;
        },
        error: err => {
          console.log("errore nel caricamento delle reviews", err);
        }
      });
    }
}
