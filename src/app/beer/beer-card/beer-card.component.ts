import { Component, Inject, Input, OnInit } from '@angular/core';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-beer-card',
  imports: [],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.css'
})
export class BeerCardComponent implements OnInit {
  @Input()
  beer!:Beer;
  ngOnInit() {  
    console.log(this.beer);  // Verifica che i dati siano passati correttamente
  }

}


