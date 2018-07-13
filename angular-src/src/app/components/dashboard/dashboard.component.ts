import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:Object;
  username: String;
  password: String;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
    var user = localStorage.getItem("user");

    var user = localStorage.getItem('user');
    if (user === null) {
      this.router.navigate(['/']);
    }
    else {
      var use = JSON.parse(user);

      if (use.auth_level == "master_admin_user") {
        this.user = use;
        return true;
      }
      else {
        this.router.navigate(['/']);
      }
    }
  }

  onLinkLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateLinkUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
      } else {
        console.log("You have failed to authenticate");
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

}
