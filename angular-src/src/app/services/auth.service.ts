import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  private dbUrl = '/users/';

  constructor(private http: Http,
              private localStorage: LocalStorageService) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers})
      .map(res => res.json());
  }

  // authenticateUser(user) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('https://mean-first.herokuapp.com:48573/users/authenticate', user, {headers})
  //     .map(res => res.json());
  //     //returns json with success and token and also user info
  // }

  authenticateUser(user) {
    console.log('authenticate func');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
<<<<<<< HEAD
    return this.http.post('/users/authenticate', user, {headers})
      .map(res => res.json());
      //returns json with success and token and also user info
=======
    return this.http.post(this.dbUrl + 'authenticate', user, {headers}).map(res => res.json);
>>>>>>> 7b073bcc9fd04d30e154a6030a5ed0c6c1eddeff
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers}).map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
