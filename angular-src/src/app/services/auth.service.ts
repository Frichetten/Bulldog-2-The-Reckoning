import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  authenticateLinkUser(user){
    return this.http.post('http://localhost:8080/users/linkauthenticate', user)
      .map(res => res.json());
  }

  getProfile(name){
    return this.http.get('http://localhost:8080/users/profile/'+name)
      .map(res => res.json());
  }

  isAdmin(){
    var user = localStorage.getItem('user');
    if (user === null) {
      return false;
    }
    else {
      var use = JSON.parse(user);
      if (use.auth_level == "admin_user") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  loggedOut(){
    return !tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
