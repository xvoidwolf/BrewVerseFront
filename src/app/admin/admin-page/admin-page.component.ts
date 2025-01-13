import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MysteryBeerContestService } from '../../services/mystery-beer-contest.service';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  errorMessage: string = '';
  selectedBeerId: number | null = null;
  weeklyBeerId: number = 0;
  beersForSelection: Beer[] = [];
  description: string = '';
  beerId: number = 0;

  constructor(private router: Router, private mysteryBeerContestService: MysteryBeerContestService, private beerService: BeerService) { }

  ngOnInit(): void {
    this.loadAllBeers();
  }

  
  onClick() {
    this.router.navigate(["add-beer"]);
  }
  loadAllBeers(): void {
    this.beerService.getAllBeers().subscribe({
      next: (data) => {
        this.beersForSelection = data;  
      },
      error: (err) => {
        console.error('Errore nel caricamento delle birre:', err);
      }
    });
  }
  activateWeeklyBeer(): void {
    this.mysteryBeerContestService.activateWeeklyBeer(this.weeklyBeerId).subscribe({
      next: (data) => {
        console.log('Birra settimanale attivata:', data);
       
      },
      error: (err) => {
        this.errorMessage = 'Errore durante l\'attivazione della birra settimanale';
        console.error(err);
      }
    });
  }
  activateSelectedBeer(): void {
    if ( this.selectedBeerId) {
      this.mysteryBeerContestService.activateWeeklyBeer(this.selectedBeerId).subscribe({
        next: () => {
          alert('Birra settimanale aggiornata con successo!');
        },
        error: (err) => {
          alert('Errore durante l\'aggiornamento della birra settimanale');
          console.error(err);
        }
      });
    }
  }
  onBeerSelectionChange(event: any): void {
    this.selectedBeerId = parseInt(event.target.value, 10);
    localStorage.setItem('selectedBeerId', this.selectedBeerId.toString());
  }
}
