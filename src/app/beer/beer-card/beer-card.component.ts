import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../../model/beer';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';

@Component({
  selector: 'app-beer-card',
  imports: [],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.css'
})
export class BeerCardComponent implements OnInit {
  @Input()
  beer!:Beer;

  @Output()
  chooseBeerEvent = new EventEmitter<Beer>();

  onSelectCard(beer: Beer) {
   this.chooseBeerEvent.emit(beer);
  }
}


