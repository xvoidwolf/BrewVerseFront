import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-beer-card-search',
  imports: [],
  templateUrl: './beer-card-search.component.html',
  styleUrl: './beer-card-search.component.css'
})
export class BeerCardSearchComponent {
  @Input()
  beer!:Beer;

  @Output()
  chooseBeerEvent = new EventEmitter<Beer>();

  onSelectCard(beer: Beer) {
   this.chooseBeerEvent.emit(beer);
  }
}
