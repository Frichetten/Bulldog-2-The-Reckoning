import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUsers(number){
    //let headers = new Headers();
    //headers.append('Content-Type','application/json');
    return this.http.get('/users/getUsers?limit='+number.toString())
      .map(res => res.json());
  }

  getProfile(name){
    return this.http.get('/users/profile/'+name)
      .map(res => res.json());
  }

}
