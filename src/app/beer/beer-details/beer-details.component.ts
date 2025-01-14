import { Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Review } from '../../model/review';
import { ReviewCardComponent } from '../../review-card/review-card.component';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-beer-details',
  imports: [CommonModule,CarouselModule,ReviewCardComponent,ReactiveFormsModule, RatingModule, FormsModule, RouterModule],
  templateUrl: './beer-details.component.html',
  styleUrl: './beer-details.component.css'
})
export class BeerDetailsComponent {
  reviews: Review[] = [];
  beerId!: number;
  beer!: Beer;
  isAdmin = false;
  isLoggedIn = false;

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
  
  
  constructor(private beerService: BeerService, private reviewService: ReviewService, 
    private router: Router, private route: ActivatedRoute, private authService:AuthService) { }


  ngOnInit(): void {
    this.getBeerById();
    this.getReviewsByBeerId();
    this.isAdmin= this.authService.isAdmin();
    this.authService.loggedIn$.subscribe({ 
      next: s => this.isLoggedIn = s,
      error: err => console.log(err)
    });
  }
  getBeerById() {
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.beerService.getBeerById(this.beerId).subscribe({
      next: beer => { this.beer = beer; },
      error: () => { alert("Errore nel caricamento della birra.");}
    });
  }

  getReviewsByBeerId() {
    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewsByBeerId(this.beerId).subscribe({
      next: reviews => {
        this.reviews = reviews;
        console.log(this.reviews);
      },
      error: (err) => { alert("Errore nel caricamento delle recensioni. " + err);}
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
        alert('La birra è stata cancellata.');
        this.router.navigate([`search-beer`]);
      },
      error :() => { alert('La birra non può essere cancellata.'); }
    });
  }
  
  
}