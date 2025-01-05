import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{
 reviewForm!:FormGroup;

 constructor(private fb: FormBuilder, private reviewService:ReviewService, private router:Router){ }

 ngOnInit(): void{
  this.reviewForm=this.fb.group({
  text:['',[Validators.required, Validators.minLength(10), Validators.maxLength(240)]],
  rating:['',[Validators.required]]  
})
 }
 onSubmit(){
  this.reviewService
 }
}
