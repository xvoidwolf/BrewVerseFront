import { Component, OnInit } from '@angular/core';
import { BeerDetailsComponent } from '../beer/beer-details/beer-details.component';
import { GameService } from '../services/game.service';
import { BeerCardComponent } from '../beer/beer-card/beer-card.component';
import { Beer } from '../model/beer';

@Component({
  selector: 'app-game',
  imports: [BeerCardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  constructor(private gameService:GameService) { }

  beers:Beer[] = [];

  ngOnInit(): void {
    this.getRandomBeers();
  }
  getRandomBeers(): void {
    this.gameService.getRandomBeers().subscribe({
      next: (beers: Beer[]) => {
        this.beers = beers;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
