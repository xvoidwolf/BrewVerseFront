import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); //creare un observable a manina, valore iniziale false
  loggedIn$ = this.loggedIn.asObservable(); //var privata, ho bisogno di questa var che è pubblica, $ convenzione -> var observable finiscono con il $
  
  constructor() {}

  getUserIdFromToken(): string | null {
    const dc = this.getDecodedToken();
    if (!dc) {
      return null;
    }
    console.log("decoded token esiste");
    console.log(dc);
    return dc.id;
  }
  private getDecodedToken() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode<any>(token); // decodifico il JWT token
      console.log(decodedToken);
      return decodedToken; // ritorno lo userId dal token decodificato
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
  setLoggedIn(status:boolean):void { //per cambiare stato login
    this.loggedIn.next(status); 
  }
  isLoggedIn():boolean {
    return this.loggedIn.value;
  }
  getUserRole():string | null {
    return this.getDecodedToken()?.role;
  }
  isAdmin():boolean {
    const dc = this.getDecodedToken();
    return dc && dc.role === "ADMIN";
  }
}