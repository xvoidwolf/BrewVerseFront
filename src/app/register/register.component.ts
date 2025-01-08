import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../model/register-dto';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;

  constructor(private fb:FormBuilder, private registerService:RegisterService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  onSubmit() {
    const register:RegisterDto={
      id: 0,
      ...this.registerForm.value,
      role: 'USER'
    }
    console.log("onSubmit");
    this.registerService.register(register).subscribe({
      next: r => { //token
        //andiamo a inserire nel local storage il token
        //var globale che esiste perchè lavoriamo con un browser come document o window
        //funziona come una mappa, chiavi e valori sono stringhe
        localStorage.setItem('jwtToken', r.token); //setta il token (r = ogg response)
        this.router.navigate(['/home']); //andiamo nella pagina home
      },
      error: err => alert('register failed.')
    }); 
  }
}
