import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-search-beer',
  imports: [BeerCardComponent],
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.css']
})
export class SearchBeerComponent implements OnInit {
  beers: Beer[] = [];
  totalElements: number = 0;
  pageNumber: number = 0;
  pageSize: number = 12;
  alcoholRange?: string;
  ratingRange?: string;
  breweryName?: string;
  type?: string;

  constructor(private beerService: BeerService) {}

  beer!:Beer;

  ngOnInit(): void {
    this.getBeers();
  }
  getBeers(): void {
    this.beerService
      .getBeers(
        this.ratingRange,
        this.alcoholRange,
        this.breweryName,
        this.type,
        this.pageSize,
        this.pageNumber
      )
      .subscribe({
        next: (response: any) => {
          this.beers = response; // Aggiorna l'elenco delle birre
        },
        error: (error) => {
          console.error('Errore durante il caricamento delle birre:', error);
        }
      });
  }

  onPageChange(event: any): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBeers();
  }

  onSubmit(event: Event): void {
    event.preventDefault(); 
    const target = event.target as HTMLFormElement;

    const name = (target['name'] as unknown as HTMLInputElement).value;
    const breweryName = (target['breweryName'] as HTMLInputElement).value;
    const type = (target['stile'] as HTMLSelectElement).value;
    const alcoholRange = (target['alcoholRange'] as HTMLSelectElement).value;
    const ratingRange = (target['valutazione'] as HTMLSelectElement).value;

    this.breweryName = breweryName || undefined;
    this.type = type || undefined;
    this.alcoholRange = alcoholRange || undefined;
    this.ratingRange = ratingRange || undefined;

    this.pageNumber = 0; 
    this.getBeers();
  }
}
