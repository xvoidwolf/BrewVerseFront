import { Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../model/review';
import { ReviewCardComponent } from '../../review-card/review-card.component';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-beer-details',
  imports: [CommonModule,CarouselModule,ReviewCardComponent],
  templateUrl: './beer-details.component.html',
  styleUrl: './beer-details.component.css'
})
export class BeerDetailsComponent {
  reviews!: Review[];
  beerId!: number;
  beer!: Beer;

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
  
  constructor(private beerService: BeerService, private reviewService: ReviewService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getBeerById();
    this.getReviewsByBeerId();
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

  getReviewsByBeerId() {
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewsByBeerId(this.beerId).subscribe({
      next: reviews => {
        this.reviews = reviews;
      },
      error: err => {
        console.log("errore nel caricamento delle reviews", err);
      }
    });
  }


  onClick(beerId:number){
    this.router.navigate([`review/${beerId}`]);
  }
  onEdit(beerId:number){
    this.router.navigate([`edit-beer/${beerId}`]);
  }
  onDelete(beerId:number){
    this.beerService.deleteBeer(beerId).subscribe({
      next:() => {
        alert('The beer was deleted successfully!');
        this.router.navigate([`search-beer`]);
      },
      error :(error) => {
        console.log(error);
        alert('The beer could not be deleted!');
      }
    });
  }
  
  
}