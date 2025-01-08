import { Component, OnInit } from '@angular/core';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-beer', 
  imports: [ReactiveFormsModule, BeerCardComponent],
  templateUrl: './search-beer.component.html',
  styleUrls: ['./search-beer.component.css']
})

export class SearchBeerComponent implements OnInit {
  beerForm!: FormGroup;
  beers: Beer[] = [];
  searchExecuted: boolean = false;
  totalElements: number = 0;
  pageNumber: number = 0;
  pageSize: number = 12;
  alcoholRange: string = '';
  ratingRange: string = '';
  breweryId: number = 0;
  beerNames: string[] = [];
  type: string= '';
  totalItems!: number;
  paginatedBeers: any[] = [];
  beerTypes: string[] = [];
  breweries: any[] = [];
  beerName: string = '';

  constructor(private fb:FormBuilder, private beerService: BeerService, private router:Router, private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.beerForm= this.fb.group({
      beerName:['',[]],
      breweryId:['',[]],
      type:['',[]],
      alcoholRange:['',[]],
      ratingRange:['',[]],
    });
    // Recupera i tipi di birre dal backend
    this.beerService.getBeerTypes().subscribe({
      next: (data) => {
        this.beerTypes = data; // Popola la lista con i tipi di birre
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei tipi di birre:', error);
      },
    });
      // Recupera i nomi delle birre dal backend
    this.beerService.getBeerNames().subscribe({
      next: (data) => {
        this.beerNames = data; // Popola la lista con i nomi delle birre
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei nomi delle birre:', error);
      },
  });
    // Recupera i birrifici dal backend
    this.beerService.getBreweries().subscribe({
      next: (data) => {
        this.breweries = data; // Popola la lista con i birrifici
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei birrifici:', error);
      },
    });
  }
  
  onSubmit(event: Event): void {
    if(this.beerForm.valid){
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
        next: (response:any) => {
          this.beers = response.content;
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
    if(this.beerForm.valid){
      this.searchExecuted = true;
      this.pageNumber = 0;
      this.ratingRange = this.beerForm.get('ratingRange')?.value || null;
      this.alcoholRange = this.beerForm.get('alcoholRange')?.value || null;
      this.breweryId = this.beerForm.get('breweryId')?.value || null;
      this.type = this.beerForm.get('type')?.value || null;
      const beerName = this.beerForm.get('name')?.value || null;
      this.beerService.getBeers(
        beerName,
        this.ratingRange,
        this.alcoholRange,
        this.breweryId,
        this.type,
        this.pageSize,
        this.pageNumber).subscribe({
        next: (response:any) => {
          this.beers = response.content;
          console.log(response);
        },
        error: (error) => {
          console.error('Errore durante il caricamento delle birre:', error);
        }
      });
    }
  }
  goToPreviousPage() {
    if(this.beerForm.valid){
      this.searchExecuted = true;
      this.pageNumber = 0;
      this.ratingRange = this.beerForm.get('ratingRange')?.value || null;
      this.alcoholRange = this.beerForm.get('alcoholRange')?.value || null;
      this.breweryId = this.beerForm.get('breweryId')?.value || null;
      this.type = this.beerForm.get('type')?.value || null;
      const beerName = this.beerForm.get('name')?.value || null;
      this.beerService.getBeers(
        beerName,
        this.ratingRange,
        this.alcoholRange,
        this.breweryId,
        this.type,
        this.pageSize,
        this.pageNumber).subscribe({
        next: (response:any) => {
          this.beers = response.content;
          console.log(response);
        },
        error: (error) => {
          console.error('Errore durante il caricamento delle birre:', error);
        }
      });
    }
  }

  onCardSelected(beer: Beer) {
  this.router.navigate([`details/${beer.id}`]);
 }
}
