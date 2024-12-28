import { Component, OnInit } from '@angular/core';
import { Beer, defaultBeer } from '../../model/beer';
import { BeerService } from '../../services/beer.service';
import { HintService } from '../../services/hint.service';
import { Hint } from '../../model/hint';


@Component({
  selector: 'app-mystery-beer-contest',
  imports: [],
  templateUrl: './mystery-beer-contest.component.html',
  styleUrl: './mystery-beer-contest.component.css'
})
export class MysteryBeerContestComponent implements OnInit {
  beers: Beer[] = [];
  hints: Hint[] = [];
  errorMessage: string = '';
  beer: Beer = defaultBeer;
  showBeerCards: boolean = false; 

  constructor(private beerService: BeerService, private hintService: HintService) { }

  ngOnInit(): void {
    console.log('Componente inizializzato');
    this.loadBeers();
    this.loadHint();
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
  loadHint(): void {
    const weeklyBeerId = 2; 
    this.hintService.getHintsByWeeklyBeerId(weeklyBeerId).subscribe({
      next: (data) => {
        console.log('Dati degli indizi:', data);
        this.hints = data;
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il caricamento dell\'indizio';
        console.error(err);
      },
    });
  }
  toggleBeerCards(): void {
    this.showBeerCards = !this.showBeerCards;
  }
}
