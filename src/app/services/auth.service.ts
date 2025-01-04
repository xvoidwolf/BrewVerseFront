import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Method to get the user ID from the JWT
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('jwtToken'); // or wherever you store the token

    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode<any>(token); // Decoding the JWT
      return decodedToken?.userId || null; // Return the userId field from the decoded token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}

