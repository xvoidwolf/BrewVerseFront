import { Component, OnInit } from '@angular/core';
import { Beer } from '../model/beer';
import { ShowcaseService } from '../services/showcase.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [CommonModule,CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit { 
  beers: Beer[] = [];
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

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit(): void {
    this.getBeersByMonthlySelectedBrewery();    
  }
  getBeersByMonthlySelectedBrewery(): void {
    this.showcaseService.getBeersByMonthlySelectedBrewery().subscribe({
      next: (res) => {  
        this.beers = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
