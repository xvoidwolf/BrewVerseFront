import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Beer } from '../model/beer';
import { BeerMiniCardComponent } from "../beer/beer-mini-card/beer-mini-card.component";
import { WinnerBeer } from '../model/winner-beer';
import { AuthService } from '../services/auth.service';
import { CombinedWinnerBeer } from '../model/combined-winner-beer';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { BeerCardComponent } from '../beer/beer-card/beer-card.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule,CarouselModule,BeerMiniCardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService, private authService:AuthService) { }

  responsiveOptions: any[] | undefined = [
    {
        breakpoint: '1400px',
        numVisible: 4,
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

  beers!: Beer[];
  chooseBeers: Beer[] = [];
  choosingCounter: number = 0;
  firstRoundBeers: Beer[] = [];
  secondRoundBeers: Beer[] = [];
  thirdRoundBeers: Beer[] = [];
  winner?: Beer; 
  hasStarted: boolean = false;
  winnerBeers: CombinedWinnerBeer[] = [];

  userId: string | null = null;

  ngOnInit(): void {
    this.getRandomBeers();
    this.userId = this.authService.getUserIdFromToken();
    this.getWinnerBeers();
    console.log(this.userId);
  }

  onStart() {
    this.hasStarted = true;
    this.getBeersToChoose();
  }

  onRestart() {
    this.hasStarted = true;
    this.beers = [];
    this.firstRoundBeers = [];
    this.secondRoundBeers = [];
    this.thirdRoundBeers = [];
    this.winner = undefined;  
    this.choosingCounter = 0; 
  
    this.getRandomBeers();
    this.getWinnerBeers();
  }
  
  getRandomBeers(): void {
    this.gameService.getRandomBeers().subscribe({
      next: (beers: Beer[]) => {
        if (beers && beers.length > 0) {
          this.beers = beers;
          // Solo dopo che le birre sono caricate, chiama il metodo per scegliere le birre
          this.getBeersToChoose();
        } else {
          console.error("Nessuna birra disponibile.");
        }
      },
      error: (error) => {
        console.error("Errore nel recupero delle birre:", error);
      }
    });
  }
  
  getBeersToChoose(): void {
    this.chooseBeers = [];
  
    if (this.firstRoundBeers.length < this.beers.length / 2) {
      this.chooseBeers.push(this.beers[this.choosingCounter]);
      this.chooseBeers.push(this.beers[this.choosingCounter + 1]);
    } else if (this.secondRoundBeers.length < this.firstRoundBeers.length / 2) {
      if (this.secondRoundBeers.length === 0) {
        this.choosingCounter = 0;
      }
      this.chooseBeers.push(this.firstRoundBeers[this.choosingCounter]);
      this.chooseBeers.push(this.firstRoundBeers[this.choosingCounter + 1]);
    } else if (this.thirdRoundBeers.length < this.secondRoundBeers.length / 2) {
      this.choosingCounter = 0;
      this.chooseBeers.push(this.secondRoundBeers[this.choosingCounter]);
      this.chooseBeers.push(this.secondRoundBeers[this.choosingCounter + 1]);
    } else {
      if (this.winner) {
        this.chooseBeers.push(this.winner);
        this.saveWinnerBeer(this.winner);
      } else {
        console.error("Winner non definito.");
      }
    }
  }

  saveWinnerBeer(beer: Beer): void {
    const winnerBeer: WinnerBeer = { 
      userId: this.userId ? parseInt(this.userId) : 0, //se c'è userId lo converto in numero, altrimenti metto 0
      beerId: beer.id,
      dateAssigned: new Date().toISOString().split("T")[0]
    };
    this.gameService.saveWinnerBeer(winnerBeer).subscribe({
      next: (winnerBeer: WinnerBeer) => {
        console.log("Birra vincitrice salvata:", winnerBeer);
      },
      error: (error) => {
        console.error("Errore nel salvataggio della birra vincitrice:", error);
      }
    });
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

  getWinnerBeers(): void {
    this.gameService.getWinnerBeers().subscribe({
      next: (winnerBeers: CombinedWinnerBeer[]) => {
        this.winnerBeers = winnerBeers;
      },
      error: (error) => {
        console.error("Errore nel recupero dei vincitori:", error);
      }
    });
  }
}

