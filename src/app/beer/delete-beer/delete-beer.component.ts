import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-delete-beer',
  imports: [],
  templateUrl: './delete-beer.component.html',
  styleUrl: './delete-beer.component.css'
})
export class DeleteBeerComponent implements OnInit {
  message : string = '';
  constructor(private beerService:BeerService ) { }

  ngOnInit(): void {
  } 
deleteBeer(id: number): void {
    this.beerService.deleteBeer(id)
      .subscribe({
        next:() => {
          this.message = 'The beer was deleted successfully!';
        },
        error :(error) => {
          console.log(error);
          this.message = 'The beer could not be deleted!';
        }
        });
  }
}
