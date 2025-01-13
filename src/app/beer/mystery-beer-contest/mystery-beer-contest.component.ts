import { Component, OnInit } from '@angular/core';
import { Beer, defaultBeer } from '../../model/beer';
import { BeerService } from '../../services/beer.service';
import { Hint } from '../../model/hint';
import { MysteryBeerContestService } from '../../services/mystery-beer-contest.service';
import { AnswerDto } from '../../model/answer';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-mystery-beer-contest',
  imports: [],
  templateUrl: './mystery-beer-contest.component.html',
  styleUrl: './mystery-beer-contest.component.css'
})
export class MysteryBeerContestComponent implements OnInit {
  winner: boolean | null = null; 
  hasVoted: boolean = false; 
  beers: Beer[] = [];
  hints: Hint[] = [];
  errorMessage: string = '';
  beer: Beer = defaultBeer;
  showBeerCards: boolean = false; 
  weeklyBeerId: number = 0;
  userId: string | null = null;
  beerId: number = 0;
  selectedBeerId: number | null = null;

  constructor(private beerService: BeerService, private mysteryBeerContestService: MysteryBeerContestService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadWeeklyBeerAndHints();
    this.userId = this.authService.getUserIdFromToken();
  }
  
  loadBeers(): void {
    if (this.weeklyBeerId === 0) {
     console.log('ID della birra settimanale non valido.');
      return;
    }
    this.mysteryBeerContestService.getRandomSelectionIncludingWeeklyBeer(this.weeklyBeerId).subscribe({
      next: (data) => {
        this.beers = data;
        console.log('Birre random:', this.beers);
      },
      error: (err) => {
        console.log ( 'Errore durante il caricamento delle birre');
        console.error(err);
      }
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
        if (!this.selectedBeerId) { 
          this.weeklyBeerId = data.id;
          console.log(`Birra settimanale impostata automaticamente: ${this.weeklyBeerId}`);
        } else {
          console.log(`L'utente ha già selezionato manualmente una birra: ${this.selectedBeerId}`);
        }
        try {
          this.weeklyBeerId = data.id; 
          console.log(`Set weeklyBeerId: ${this.weeklyBeerId}`);
          this.loadHint();
          this.checkIfUserHasVoted();
          this.loadBeers();
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
    if (!this.hasVoted) {
      this.showBeerCards = !this.showBeerCards;
    }
  }

  toggleFlip(event: any) {
    const card = event.currentTarget; 
    card.classList.toggle('flipped'); 
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
        this.hasVoted = true; 
        this.hasUserWon(beerId);  
        alert('Risposta inviata con successo!');
      },
      error: () => {alert('Hai già votato per questa settimana');}
    });
  }

  hasUserWon(beerId: number): void {
    this.mysteryBeerContestService.hasUserWon(this.weeklyBeerId, beerId).subscribe({
      next: (data: boolean) => {
        this.winner = data; 
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il controllo della risposta';
        console.error(err);
      }
    });
  }

  checkIfUserHasVoted(): void {
    this.mysteryBeerContestService.checkIfUserHasVoted(this.weeklyBeerId).subscribe({
      next: (data: boolean) => {
        this.hasVoted = data;
  
        if (data) {
          console.log('L\'utente ha già votato. Recupero la risposta...');
          this.mysteryBeerContestService.getAnswerByUserId(Number(this.userId)).subscribe({
            next: (answerData) => {
              if (answerData && answerData.length > 0) { 
                console.log('Risposta dell\'utente:', answerData);
                const answer = answerData[0]; 
                this.beerId = answer.beerId;
      
                console.log(`Verifica se l'utente ha votato per la birra settimanale con weeklyBeerId: ${this.weeklyBeerId}`);
                console.log(`weeklyBeerId dalla risposta: ${answer.weeklyBeerId}`);
          
                if (answer.weeklyBeerId === this.weeklyBeerId) {
                  console.log(`Verifica se l'utente ha vinto con beerId: ${this.beerId}`);
                  this.hasUserWon(this.beerId); 
                } else {
                  console.warn('L\'utente ha votato per una birra diversa.');
                }
              } else {
                console.warn('Nessuna risposta trovata per l\'utente.');
              }
            },
            error: (err) => {
              this.errorMessage = 'Errore nel recupero della risposta dell\'utente.';
              console.error(err);
            }
          });
        } else {
          console.log('L\'utente non ha ancora votato.');
        }
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il controllo del voto';
        console.error(err);
      }
    });
  }
  //tutti questi console.log non servono era per debuggare :)
}
