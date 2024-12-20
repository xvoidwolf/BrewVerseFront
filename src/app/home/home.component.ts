import { Component, OnInit } from '@angular/core';
import { Beer } from '../model/beer';
import { ShowcaseService } from '../services/showcase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit { 
  beers: Beer[] = [];
  

  constructor(private showcaseService: ShowcaseService) { }

  ngOnInit(): void {
    this.getAllBeers();    
  }
  getAllBeers(): void {
    this.showcaseService.getAllBeers().subscribe({
      next: (res) => {  
        this.beers = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
}
