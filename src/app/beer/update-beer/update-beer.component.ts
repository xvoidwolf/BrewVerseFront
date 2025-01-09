import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-update-beer',
  imports: [],
  templateUrl: './update-beer.component.html',
  styleUrl: './update-beer.component.css'
})
export class UpdateBeerComponent implements OnInit {
  
  constructor(private beerService:BeerService) { }

  ngOnInit(): void {
  }
  updateBeer(id: number): void {
    //this.beerService.updateBeer(id)
      //.subscribe({
        //next:() => {
          //this.message = 'The beer was updated successfully!';
        //},
        //error :(error) => {
          //console.log(error);
          //this.message = 'The beer could not be updated!';
        //}
        //});
  }

}
