import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';


@Component({
  selector: 'app-add-beer',
  imports: [],
  templateUrl: './add-beer.component.html',
  styleUrl: './add-beer.component.css'
})
export class AddBeerComponent implements OnInit {
  message : string = '';
  constructor(private beerService:BeerService) { }

  ngOnInit(): void {
  }
addBeer(beer: Beer): void {
    this.beerService.createBeer(beer)
      .subscribe({
        next:() => {
          this.message = 'The beer was created successfully!';
        },
        error :(error) => {
          console.log(error);
          this.message = 'The beer could not be created!';
        }
        });

  }
}
