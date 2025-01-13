import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../../model/beer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-beer-card-search',
  imports: [ReactiveFormsModule, RatingModule, FormsModule],
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
