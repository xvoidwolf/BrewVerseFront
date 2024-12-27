import { Component, OnInit } from '@angular/core';
import { Beer, defaultBeer } from '../../model/beer';
import { BeerService } from '../../services/beer.service';


@Component({
  selector: 'app-mystery-beer-contest',
  imports: [],
  templateUrl: './mystery-beer-contest.component.html',
  styleUrl: './mystery-beer-contest.component.css'
})
export class MysteryBeerContestComponent implements OnInit {
  beers: Beer[] = [];
  errorMessage: string = '';
  beer: Beer = defaultBeer;
  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.loadBeers();
  }

  loadBeers(): void {
    this.beerService.getAllBeers().subscribe({
      next: (data) => {
        this.beers = data; 
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il caricamento delle birre';
        console.error(err);
      },
    });
  }
}
