import { Component, Input } from '@angular/core';
import { BeerDetailsComponent } from '../beer-details/beer-details.component';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-beer-card',
  imports: [],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.css'
})
export class BeerCardComponent {
  @Input()
  beer!:Beer;
}
