import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from '../model/login-dto';
import { TokenResponse } from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(login:LoginDto):Observable<TokenResponse> { //ritornerà il token per il login
    const headers = new HttpHeaders({
        'Content-Type':'application/json'
    }); //settare il giusto content type
    return this.http.post<TokenResponse>(`http://localhost:8080/api/auth/login`, login, {headers});
}
}