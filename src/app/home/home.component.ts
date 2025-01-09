import { Component, Injector, Input, OnInit } from '@angular/core';
import { Beer } from '../model/beer';
import { ShowcaseService } from '../services/showcase.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { BeerCardComponent } from '../beer/beer-card/beer-card.component';
import { BeerCardSearchComponent } from "../beer/beer-card-search/beer-card-search.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, BeerCardSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit { 
  beers: Beer[] = [];
  breweryDescription: string = '';
  responsiveOptions: any[] | undefined = [
    {
        breakpoint: '1400px',
        numVisible: 2,
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

  constructor(private showcaseService: ShowcaseService, private router:Router) { }
  ngOnInit(): void {
    this.getBeersByMonthlySelectedBrewery(); 
    this.getBreweryDescriptionById(5);
  
  }
  getBeersByMonthlySelectedBrewery(): void {
    this.showcaseService.getBeersByMonthlySelectedBrewery().subscribe({
      next: (res) => {  
        this.beers = res;
        console.log(this.beers);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  getBreweryDescriptionById(id: number): void {
    this.showcaseService.getBreweryDescriptionById(id).subscribe({
      next: (res) => {
        this.breweryDescription = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
// Metodo per creare l'injector dinamico
// createInjector(beer: any) {
//   const injector = Injector.create({
//     providers: [{ provide: 'beer', useValue: beer }],
//     parent: this.injector
//   });
//   return injector;
// }

// carouselComponents = this.beers.map(beer => BeerCardComponent);

onCardSelected(beer: Beer) {
  this.router.navigate([`details/${beer.id}`]);
 }
}
