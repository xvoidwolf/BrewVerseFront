import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('jwtToken'); // prendo il token dal local storage

    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode<any>(token); // decodifico il JWT token
      return decodedToken?.userId || null; // ritorno lo userId dal token decodificato
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}

