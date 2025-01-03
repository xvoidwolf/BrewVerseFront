import { Component, OnInit } from '@angular/core';
import { Beer, defaultBeer } from '../../model/beer';
import { BeerService } from '../../services/beer.service';
import { Hint } from '../../model/hint';
import { MysteryBeerContestService } from '../../services/mystery-beer-contest.service';
import { AnswerDto } from '../../model/answer';


@Component({
  selector: 'app-mystery-beer-contest',
  imports: [],
  templateUrl: './mystery-beer-contest.component.html',
  styleUrl: './mystery-beer-contest.component.css'
})
export class MysteryBeerContestComponent implements OnInit {
  winner: boolean = false;
  beers: Beer[] = [];
  hints: Hint[] = [];
  errorMessage: string = '';
  beer: Beer = defaultBeer;
  showBeerCards: boolean = false; 
  weeklyBeerId: number = 0;

  constructor(private beerService: BeerService, private mysteryBeerContestService: MysteryBeerContestService) { }

  ngOnInit(): void {
    this.loadBeers();
    this.loadWeeklyBeerAndHints();
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
    this.mysteryBeerContestService.getHintsByWeeklyBeerId(this.weeklyBeerId).subscribe({
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

  loadWeeklyBeerAndHints(): void {
    this.mysteryBeerContestService.getCurrentWeeklyBeer().subscribe({
      next: (data) => {
        try {
          this.weeklyBeerId = data.id; // Assumendo che il parsing funzioni
          this.loadHint();
        } catch (e) {
          console.error('Errore durante il parsing della risposta:', e);
          this.errorMessage = 'Errore nei dati ricevuti dal server';
        }
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il caricamento della birra settimanale';
        console.error(err);
      }
    });
  }

  toggleBeerCards(): void {
    this.showBeerCards = !this.showBeerCards;
  }

  submitAnswer(beerId: number): void {
    const answerDto: AnswerDto = {
      date: new Date().toISOString().split('T')[0],
      beerId: beerId,
      weeklyBeerId: this.weeklyBeerId
    };
    console.log('Invio risposta con questi dati:', answerDto);
    this.mysteryBeerContestService.createAnswer(answerDto).subscribe({
      next: () => {
        this.hasUserWon(beerId);  
        this.errorMessage = 'Risposta inviata con successo!';
      },
      error: (err) => {
        this.errorMessage = 'Errore durante l\'invio della risposta';
        console.error(err);
      }
    });
  }

  hasUserWon(beerId: number): void {
    this.mysteryBeerContestService.hasUserWon(this.weeklyBeerId, beerId).subscribe({
      next: (data: boolean) => {
        this.winner = data; 
        this.errorMessage = data ? 'Hai vinto!' : 'Hai perso!';
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il controllo della risposta';
        console.error(err);
      }
    });
  }
}