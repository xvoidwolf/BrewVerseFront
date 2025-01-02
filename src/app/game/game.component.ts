import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Beer } from '../model/beer';
import { BeerMiniCardComponent } from "../beer/beer-mini-card/beer-mini-card.component";

@Component({
  selector: 'app-game',
  imports: [BeerMiniCardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  constructor(private gameService:GameService) { }

  beers!:Beer[];

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
