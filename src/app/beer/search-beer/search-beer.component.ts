import { Component, OnInit } from '@angular/core';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  alcoholRange?: string;
  ratingRange?: string;
  breweryName?: string;
  type?: string;

  constructor(private fb:FormBuilder, private beerService: BeerService) {}
  
  ngOnInit(): void {
    this.beerForm= this.fb.group({
      name:['',[]],
      breweryName:['',[]],
      type:['',[]],
      alcoholRange:['',[]],
      ratingRange:['',[]],
    });
  }

  onSubmit(event: Event): void {
    if(this.beerForm.valid){
      this.searchExecuted = true;
      this.pageNumber = 0;
      this.ratingRange = this.beerForm.get('ratingRange')?.value;
      this.alcoholRange = this.beerForm.get('alcoholRange')?.value;
      this.breweryName = this.beerForm.get('breweryName')?.value;
      this.type = this.beerForm.get('type')?.value;
      this.beerService.getBeers(
        this.ratingRange,
        this.alcoholRange,
        this.breweryName,
        this.type,
        this.pageSize,
        this.pageNumber).subscribe({
        next: (response: Beer[]) => {
          this.beers = response;
        },
        error: (error) => {
          console.error('Errore durante il caricamento delle birre:', error);
        }
      });
    }

  }
}
