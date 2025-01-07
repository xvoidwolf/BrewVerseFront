import { Component, OnInit } from '@angular/core';
import { Beer } from '../model/beer';
import { ShowcaseService } from '../services/showcase.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit { 
  beers: Beer[] = [];
  

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
