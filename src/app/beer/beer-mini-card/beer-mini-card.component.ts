import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-beer-mini-card',
  imports: [],
  templateUrl: './beer-mini-card.component.html',
  styleUrl: './beer-mini-card.component.css'
})
export class BeerMiniCardComponent {
  @Input()
  beer!:Beer;
  @Output()
  beerClicked: EventEmitter<Beer> = new EventEmitter<Beer>();

  onBeerClicked() {
    this.beerClicked.emit(this.beer);
    console.log(this.beer);
  }
}
