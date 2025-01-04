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
  chooseBeers:Beer[] = [];
  choosingCounter:number = 0;
  firstRoundBeers:Beer[] = [];
  secondRoundBeers:Beer[] = [];
  thirdRoundBeers:Beer[] = [];
  winner!:Beer;
  hasStarted:boolean = false;

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
  onStart() {
    this.hasStarted = true;
    this.getBeersToChoose();
  }
  onChooseBeer(beer: Beer): void {
    console.log(this.choosingCounter);
    if (this.firstRoundBeers.length < this.beers.length / 2) {
      this.firstRoundBeers.push(beer);
    }
    else if (this.secondRoundBeers.length < this.firstRoundBeers.length / 2) {
      this.secondRoundBeers.push(beer);
    }
    else if (this.thirdRoundBeers.length < this.secondRoundBeers.length / 2) {
      this.thirdRoundBeers.push(beer);
      this.winner = beer;
    }
    this.choosingCounter += 2;
    this.getBeersToChoose();
     
  }
  getBeersToChoose(): void {
      this.chooseBeers = [];

      if (this.firstRoundBeers.length < this.beers.length / 2) {
        this.chooseBeers.push(this.beers[this.choosingCounter]);
        this.chooseBeers.push(this.beers[this.choosingCounter + 1]);

      } else if (this.secondRoundBeers.length < this.firstRoundBeers.length / 2) {
        if (this.secondRoundBeers.length == 0) {
          this.choosingCounter = 0;
        }
        this.chooseBeers.push(this.firstRoundBeers[this.choosingCounter]);
        this.chooseBeers.push(this.firstRoundBeers[this.choosingCounter + 1]);

      } else if (this.thirdRoundBeers.length < this.secondRoundBeers.length / 2) {
        this.choosingCounter = 0;
        
        this.chooseBeers.push(this.secondRoundBeers[this.choosingCounter]);
        this.chooseBeers.push(this.secondRoundBeers[this.choosingCounter + 1]);

      } else {
        this.chooseBeers.push(this.winner);
      }
  }
}
