import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userEmail: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserInfo().then((user) => {
      if (user) {
        this.userEmail = user.email
      }
    })
  }

  logout() {
    this.authService.logout();
  }

}
