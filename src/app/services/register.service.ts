import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../model/register-dto';
import { TokenResponse } from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  // Metodo per la registrazione
  register(register:RegisterDto): Observable<TokenResponse> {
    const headers = new HttpHeaders({
            'Content-Type':'application/json'
        }); //settare il giusto content type
    return this.http.post<TokenResponse>(`http://localhost:8080/api/auth/register`, register, {headers});
  }
}
