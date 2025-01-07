import { Component } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../../model/review';
import { ReviewCardComponent } from '../../review-card/review-card.component';

@Component({
  selector: 'app-beer-details',
  imports: [ReviewCardComponent],
  templateUrl: './beer-details.component.html',
  styleUrl: './beer-details.component.css'
})
export class BeerDetailsComponent {
reviews!:Review[];
beerId!:number;

constructor(private reviewService:ReviewService, private router:Router, private route:ActivatedRoute){ }


ngOnInit():void{
  this.getReviews();
}

// TODO: chiamata per prendere la birra

getReviews(){
  this.beerId=Number(this.route.snapshot.paramMap.get('id'));
  this.reviewService.getReviews(this.beerId).subscribe({
    next: reviews=>{
      this.reviews=reviews;
    },
    error:err=>{
      console.log("errore nel caricamento delle reviews",err);
    }
  });
}

}
