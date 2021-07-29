import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUserInfo().then((user) => {
      if (user) {
        this.userEmail = user.email
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  createNewWebsite(): void {
    this.router.navigate(['/website/new']).then();
  }

}
