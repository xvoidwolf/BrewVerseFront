import { Component, Input } from '@angular/core';
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
}
