import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Osservabile per il login
  private loggedIn = new BehaviorSubject<boolean>(false); // Valore iniziale: false
  loggedIn$ = this.loggedIn.asObservable(); // Observable pubblico (convenzione $)
  //private isAdminState = new BehaviorSubject<boolean>(false);
  //isAdmin$ = this.isAdminState.asObservable();
  private admin = false;

  constructor() {
    if(localStorage.getItem('jwtToken')) { // se il token esiste setto come loggato
      this.setLoggedIn(true);
    }
  }

  // ** Ottieni lo userId dal token decodificato **
  getUserIdFromToken(): string | null {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return null;
    }
    return decodedToken.userId; // Ritorna lo userId dal token decodificato
  }

  getUserNameFromToken(): string | null {
    const dc = this.getDecodedToken();
    if (!dc) {
      return null;
    }
    return dc.name; // ritorno lo userName dal token decodificato
  }

  // ** Decodifica il token JWT **
  private getDecodedToken() {
    const token = localStorage.getItem('jwtToken'); // Recupera il token dal localStorage
    if (!token) {
      return null; // Se il token non esiste, ritorna null
    }

    try {
      const decodedToken = jwtDecode<any>(token); // Decodifica il JWT
      console.log(decodedToken);
      return decodedToken; // Ritorna il token decodificato
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  // ** Cambia lo stato di login **
  setLoggedIn(status: boolean): void {
    this.admin = this.isAdminFromToken(); // Controlla se l'utente è un ADMIN
    this.loggedIn.next(status); // Aggiorna lo stato del BehaviorSubject
  }

  // ** Controlla se l'utente è loggato **
  isLoggedIn(): boolean {
    return this.loggedIn.value; // Restituisce il valore corrente del BehaviorSubject
  }

  // ** Ottieni il ruolo dell'utente dal token decodificato **
  getUserRole(): string | null {
    return this.getDecodedToken()?.role || null; // Ritorna il ruolo dell'utente, o null se non esiste
  }

  // ** Controlla se l'utente è un ADMIN **
  isAdminFromToken(): boolean {
    const decodedToken = this.getDecodedToken();
    return decodedToken && decodedToken.role == 'ADMIN'; // Ritorna true se il ruolo è "ADMIN"
  }
  isAdmin(): boolean {
      return this.admin;
    }

  // ** Metodo per il logout **
  logout(): void {
    localStorage.removeItem('jwtToken'); // Rimuovi il token dal localStorage
    this.setLoggedIn(false); // Aggiorna lo stato di login
    this.admin = false;
    console.log('User logged out successfully.');
  }
}
