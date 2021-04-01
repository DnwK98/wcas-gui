import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loggedIn: boolean | null = null;
  email: string = '';
  password: string = '';
  errors: any = {};

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const that = this;
    this.authService.verifyLoggedIn()
      .then((res) => {
        console.log(res);
        that.loggedIn = true;
        that.router.navigate(['/'])
      })
      .catch(() => {
        that.loggedIn = false;
      });
  }

  login(): void {
    const that = this;
    this.authService.login(this.email, this.password)
      .then(() => {
        that.errors = {};
        that.router.navigate(['']);
      })
      .catch(errorsResponse => {
        that.password = '';
        if (errorsResponse.error.errors) {
          that.errors = errorsResponse.error.errors;
        }
      });
  }

}
