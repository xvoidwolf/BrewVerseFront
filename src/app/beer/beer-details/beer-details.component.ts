import { Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../model/review';
import { ReviewCardComponent } from '../../review-card/review-card.component';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-beer-details',
  imports: [ReviewCardComponent],
  templateUrl: './beer-details.component.html',
  styleUrl: './beer-details.component.css'
})
export class BeerDetailsComponent {
  reviews!: Review[];
  beerId!: number;
  beer!: Beer;

  constructor(private beerService: BeerService, private reviewService: ReviewService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getBeerById();
    this.getReviews();
  }
  getBeerById() {
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.beerService.getBeerById(this.beerId).subscribe({
      next: beer => {
        this.beer = beer;
      },
      error: err => {
        console.log("errore nel caricamento della birra", err);
      }
  });
}

getReviews(){
  this.beerId = Number(this.route.snapshot.paramMap.get('id'));
  this.reviewService.getReviews(this.beerId).subscribe({
    next: reviews => {
      this.reviews = reviews;
    },
    error: err => {
      console.log("errore nel caricamento delle reviews", err);
    }
  });
}

}
