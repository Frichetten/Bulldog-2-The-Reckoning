import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Object;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    var val = this.router.url;
    var va = val.split("/");
    if (va.length < 3){
      var user = JSON.parse(localStorage.getItem("user"));
      this.router.navigate(['/profile/'+user.username]);
    }

    this.authService.getProfile(va[2]).subscribe(profile => {
      this.user = profile;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
