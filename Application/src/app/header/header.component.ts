import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  loggedIn: boolean;
  constructor(public authService: AuthService) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.authService.checkLoginStatus().subscribe(response => {
      this.loggedIn = response;
    });
  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }

  logoutWithGoogle() {
    this.authService.logout();
  }
}
