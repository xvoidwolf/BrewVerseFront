import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  isLoggedIn:boolean = false;

  constructor(private fb:FormBuilder, private loginService:LoginService, private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.authService.loggedIn$.subscribe({ //qui un po' inutile rip
      next: s => this.isLoggedIn = s,
      error: err => console.log(err)
    });
  }
  onSubmit() {
    console.log("onSubmit");
    this.loginService.login(this.loginForm.value).subscribe({
      next: r => { //token
        //andiamo a inserire nel local storage il token
        //var globale che esiste perchè lavoriamo con un browser come document o window
        //funziona come una mappa, chiavi e valori sono stringhe
        localStorage.setItem('jwtToken', r.token); //setta il token (r = ogg response)
        this.authService.setLoggedIn(true); //diciamo che siamo loggati, tutte le componenti in ascolto sapranno
        this.router.navigate(['/home']); //andiamo nella pagina home
      },
      error: err => alert('Nome utente o password errati.')
    }); 
  }
}

