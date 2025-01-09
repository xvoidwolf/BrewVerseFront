import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Beer } from '../../model/beer';

@Component({
  selector: 'app-update-beer',
  imports: [ReactiveFormsModule],
  templateUrl: './update-beer.component.html',
  styleUrl: './update-beer.component.css'
})
export class UpdateBeerComponent implements OnInit {
  beerId!: number;
  updateForm!: FormGroup;
  breweries!: { id: number; name: string }[];
  constructor(private beerService: BeerService, private route: ActivatedRoute, private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: ['', []],
      type: ['', []],
      imageUrl: ['', []],
      alcoholPercentage: ['', []],
      breweryId: ['', []]
    });

    this.beerId = Number(this.route.snapshot.paramMap.get('id'));
    this.beerService.getBeerById(this.beerId).subscribe({
      next: beer => {
        console.log(beer);
        console.log(this.updateForm.value); //oggetto valori form
        this.updateForm.patchValue(beer);
      },
      error: err => {
        console.log("errore nel caricamento della birra", err);
      }

    });
    
    this.beerService.getBreweries().subscribe({
      next: breweries => {
        this.breweries = breweries;
        console.log(breweries);
      },
      error: err => {
        console.log("errore nel caricamento dei birrifici", err);
      } 
    });

  }
  
  updateBeer(): void {
    console.log(this.updateForm.value);
    const updatedBeer: Beer ={
    id:this.beerId,
     ...this.updateForm.value
     };
    this.beerService.updateBeer(this.beerId, updatedBeer).subscribe({
      next:() => {
        console.log('The beer was updated successfully!');
        this.router.navigate([`details/${this.beerId}`]);
      },
      error :(error) => {
        console.log(error);
        alert('The beer could not be updated!');
      }
    });
    //.subscribe({
    //next:() => {
    //this.message = 'The beer was updated successfully!';
    //},
    //error :(error) => {
    //console.log(error);
    //this.message = 'The beer could not be updated!';
    //}
    //});
  }

}
