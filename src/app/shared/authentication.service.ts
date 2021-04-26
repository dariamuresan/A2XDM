import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getCurrentLoggedUser() : string {
    return "Daria";
  }
}
