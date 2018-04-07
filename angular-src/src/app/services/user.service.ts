import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  getUsers(number){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8080/users/getUsers?limit='+number.toString(), {headers: headers})
      .map(res => res.json());
  }

}
