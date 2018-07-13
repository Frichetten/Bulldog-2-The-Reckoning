import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;

  constructor(private userService:UserService) { }

  randomImage() {
    return 1 + Math.floor(Math.random() * (23-1+1));
  }

  ngOnInit() {
    this.userService.getUsers(9).subscribe(users => {
      this.users = users;
    });
  }

}
