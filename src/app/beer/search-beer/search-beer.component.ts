import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerCardSearchComponent } from "../beer-card-search/beer-card-search.component";
import { PagerComponent } from "../../pager/pager.component";

@Component({
  selector: 'app-search-beer',
  imports: [ReactiveFormsModule, BeerCardSearchComponent, PagerComponent],
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.css']
})

export class SearchBeerComponent implements OnInit {
  beerForm!: FormGroup;
  beers: Beer[] = [];
  searchExecuted: boolean = false;
  totalElements: number = 0;
  totalPages:number = 0;
  pageNumber: number = 0;
  pageSize: number = 3;
  alcoholRange: string = '';
  ratingRange: string = '';
  breweryId: number = 0;
  beerNames: string[] = [];
  type: string = '';
  paginatedBeers: any[] = [];
  beerTypes: string[] = [];
  breweries: any[] = [];
  beerName: string = '';

  constructor(private fb: FormBuilder, private beerService: BeerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.beerForm = this.fb.group({
      beerName: ['', []],
      breweryId: ['', []],
      type: ['', []],
      alcoholRange: ['', []],
      ratingRange: ['', []],
    });

    this.beerService.getBeerTypes().subscribe({
      next: (data) => {
        this.beerTypes = data;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei tipi di birre:', error);
      },
    });

    this.beerService.getBeerNames().subscribe({
      next: (data) => {
        this.beerNames = data;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei nomi delle birre:', error);
      },
    });

    this.beerService.getBreweries().subscribe({
      next: (data) => {
        this.breweries = data;
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei birrifici:', error);
      },
    });
  }

  onSubmit(event: Event): void {
    if (this.beerForm.valid) {
      this.searchExecuted = true;
      this.pageNumber = 0;
      this.ratingRange = this.beerForm.get('ratingRange')?.value || null;
      this.alcoholRange = this.beerForm.get('alcoholRange')?.value || null;
      this.breweryId = this.beerForm.get('breweryId')?.value || null;
      console.log(this.beerForm.get('breweryId'));
      this.type = this.beerForm.get('type')?.value || null;
      this.beerName = this.beerForm.get('beerName')?.value || null;
      console.log(this.beerForm.value);
      this.beerService.getBeers(
        this.beerName,
        this.ratingRange,
        this.alcoholRange,
        this.breweryId,
        this.type,
        this.pageSize,
        this.pageNumber).subscribe({
          next: (response: any) => {
            this.beers = response.content;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
            console.log(response);
          },
          error: (error) => {
            console.error('Errore durante il caricamento delle birre:', error);
          }
        });
    }
  }

  hasNextPage(): boolean {
    return this.pageSize <= 13
  }

  hasPreviousPage(): boolean {
    return this.pageNumber > 0;
  }

  goToNextPage() {
    this.pageNumber++;
    this.beerService.getBeers(
      this.beerName,
      this.ratingRange,
      this.alcoholRange,
      this.breweryId,
      this.type,
      this.pageSize,
      this.pageNumber).subscribe({
        next: (response: any) => {
          this.beers = response.content;
          console.log(response);
        },
        error: (error) => {
          console.error('Errore durante il caricamento delle birre:', error);
        }
      });
  }

  goToPreviousPage() {
    this.pageNumber--;
    this.beerService.getBeers(
      this.beerName,
      this.ratingRange,
      this.alcoholRange,
      this.breweryId,
      this.type,
      this.pageSize,
      this.pageNumber).subscribe({
        next: (response: any) => {
          this.beers = response.content;
          console.log(response);
        },
        error: (error) => {
          console.error('Errore durante il caricamento delle birre:', error);
        }
      });
  }

  onCardSelected(beer: Beer) {
    this.router.navigate([`details/${beer.id}`]);
  }

  isButtonDisabled() : boolean {
    const formValues=Object.values(this.beerForm.value);  
    return !formValues.some(v=>v && (<string> v).trim() !== "");
    //some = metodo come .stream da chiamare suglia array
    //trim = metodo sulle stringhe
    //v non è nullo ed è diverso dalla stringa ""
    //ritorna che non è vero che almeno uno degli elementi esiste ed è diverso dalla stringa vuota -> il bottone deve essere disabilitato
  }
}
